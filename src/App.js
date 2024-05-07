import { useEffect, useRef, useState } from 'react';
import Filters from './components/Filters';
import JobCard from './components/JobCard';
import './utils/css/App.css';
import { Box, ThemeProvider, Typography, createTheme } from '@mui/material';

function App() {
  const [renderedJobs, setRenderedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [filters, setFilters] = useState({});
  const [extraCards, setExtraCards] = useState(0);

  const totalJobs = useRef(0);
  const fetchJobs = async () => {
    setLoader(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      limit: 24,
      offset: (page - 1) * 24,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body,
    };

    await fetch(
      'https://api.weekday.technology/adhoc/getSampleJdJSON',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        totalJobs.current = result.totalCount;
        console.log('visited');
        // return result.jdList;
        setRenderedJobs((rj) => [...rj, ...result.jdList]);
        if (Object?.keys(filters)?.length > 0) {
          filterJobs();
        }
      })
      .catch((error) => console.log(error));

    setLoader(false);
  };

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && page <= Math.ceil(totalJobs.current / 12)) {
      // console.log('from scroll page');
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterJobs();
  }, [filters]);

  const theme = createTheme({
    typography: {
      lexend_reg: {
        fontSize: 14,
        fontFamily: 'Lexend',
      },
      lexend_med: {
        fontSize: 14,
        fontFamily: 'Lexend',
        fontWeight: 500,
      },
      lexend_semiBold: {
        fontSize: 14,
        fontFamily: 'Lexend',
        fontWeight: 600,
      },
      lexend_bold: {
        fontSize: 14,
        fontFamily: 'Lexend',
        fontWeight: 700,
      },
      lexend_extraBold: {
        fontSize: 14,
        fontFamily: 'Lexend',
        fontWeight: 800,
      },
      lexend_black: {
        fontSize: 14,
        fontFamily: 'Lexend',
        fontWeight: 900,
      },
      // Disable h3 variant
      // h3: undefined,
    },
  });

  const finalRenderdArr =
    Object.keys(filters)?.length > 0 ? filteredJobs : renderedJobs;

  const filterJobs = () => {
    const tempArr =
      filterJobs?.length > 0 ? [...filteredJobs] : [...renderedJobs];
    let filteredJobsArr = [...tempArr];
    if (filters?.role) {
      filteredJobsArr = tempArr?.filter((rj) => rj.jobRole == filters?.role);
    }
    if (filters?.companyName) {
      const currentFilteredArr = [...filteredJobsArr];
      const tempArr = currentFilteredArr?.filter((rj) =>
        rj?.companyName?.toLowerCase()?.includes(filters?.companyName)
      );
      if (filters?.companyName?.length > 0) {
        filteredJobsArr = [...tempArr];
      }
    }
    if (filters?.minSalary) {
      const currentFilteredArr = [...filteredJobsArr];
      const tempArr = currentFilteredArr?.filter((rj) => {
        let maxPackage = rj?.maxJdSalary || rj?.minJdSalary;
        return filters?.minSalary <= maxPackage;
      });
      filteredJobsArr = [...tempArr];
    }

    if (filters?.exp) {
      const currentFilteredArr = [...filteredJobsArr];
      const tempArr = currentFilteredArr?.filter((rj) => {
        let minExp = rj?.minExp || rj?.maxExp;
        return filters?.exp >= minExp;
      });
      filteredJobsArr = [...tempArr];
    }
    setFilteredJobs(filteredJobsArr);
  };

  useEffect(() => {
    const cardConstant =
      window?.screen?.availWidth >= 1200
        ? 3
        : window?.screen?.availWidth >= 900
        ? 2
        : 1;
    const cards =
      finalRenderdArr?.length % 3 == 0
        ? 0
        : cardConstant - (finalRenderdArr?.length % cardConstant);
    setExtraCards(cards);
  }, [finalRenderdArr]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ padding: 20 }}>
        <Filters filters={filters} setFilters={setFilters} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {finalRenderdArr?.map((j, idx) => {
            return <JobCard key={j.jdUid} jd={j} filters={filters} />;
          })}
          {[...Array(extraCards)]?.map((_, idx) => {
            return (
              <Box
                sx={{
                  display: { md: 'flex', xs: 'none' },
                  flexDirection: 'column',
                  gap: 1,
                  borderRadius: 5,
                  // border: '1px solid #AAAAAA',
                  p: 2,
                  alignItems: 'flex-start',
                  width: { lg: '30%', xs: '-webkit-fill-available', md: '45%' },
                  // boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 4px 0px',
                }}
              ></Box>
            );
          })}
        </Box>
        {loader && <Typography sx={{ my: 5 }}>loading more jobs...</Typography>}
      </div>
    </ThemeProvider>
  );
}

export default App;
