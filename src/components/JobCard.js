import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
import '../utils/css/App.css';

const JobCard = ({ jd }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 5,
        // border: '1px solid #AAAAAA',
        p: 2,
        alignItems: 'flex-start',
        width: { lg: '30%', xs: '-webkit-fill-available', md: '45%' },
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 4px 0px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          //   border: '1px solid #AAAAAA',
          borderRadius: 5,
          //   alignSelf: 'flex-start',
          p: 1,

          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 4px 0px',
        }}
      >
        <Typography variant="lexend_reg" sx={{ fontSize: 12 }}>
          ⏳ Posted 10 days ago
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
          my: 1,
          //   border: '1px solid #AAAAAA',
          //   borderRadius: 5,
          //   alignSelf: 'flex-start',
          //   px: 1,
        }}
      >
        <img src={jd?.logoUrl} width={50} style={{}} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.8,
            textAlign: 'left',
          }}
        >
          <Typography variant="lexend_med" sx={{ color: '#8b8b8b' }}>
            {jd?.companyName}
          </Typography>
          <Typography variant="lexend_reg">
            {jd?.jobRole
              ?.split(' ')
              ?.map((w) => `${w[0]?.toUpperCase()}${w.substring(1)}`)
              ?.join(' ')}
          </Typography>
          <Typography variant="lexend_reg">
            {jd?.location
              ?.split(' ')
              ?.map((w) => `${w[0]?.toUpperCase()}${w.substring(1)}`)
              ?.join(' ')}
          </Typography>
        </Box>
      </Box>

      <Typography variant="lexend_med" sx={{ color: '#8b8b8b' }}>
        Estimated Salary:{' '}
        {`${jd?.salaryCurrencyCode == 'USD' ? '$' : '₹'}${
          jd?.minJdSalary ? `${jd?.minJdSalary} - ` : ''
        }${jd?.maxJdSalary} LPA ✅`}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maskImage:
            'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))',
          height: jd?.minExp ? '200px' : '268px',
          position: 'relative',
        }}
      >
        <Typography variant="lexend_med" sx={{ fontSize: 16 }}>
          About Company:{' '}
        </Typography>
        <Typography variant="lexend_bold" sx={{ fontSize: 14 }}>
          About us
        </Typography>
        <Typography
          variant="lexend_reg"
          sx={{ fontSize: 14, textAlign: 'left' }}
        >
          {jd?.jobDetailsFromCompany}
        </Typography>
      </Box>
      <Box sx={{ width: '-webkit-fill-available' }}>
        <a href={jd?.jdLink} target="_blank" style={{ textDecoration: 'none' }}>
          <Typography variant="lexend_reg" sx={{ color: '#4943da' }}>
            View Job
          </Typography>
        </a>
      </Box>
      <Box
        sx={{
          display: jd?.minExp ? 'flex' : 'none',
          gap: 1,
          flexDirection: 'column',
          textAlign: 'left',
        }}
      >
        <Typography
          variant="lexend_med"
          sx={{ fontSize: 14, color: '#8b8b8b', letterSpacing: 1, mt: 2 }}
        >
          Minimum Experience
        </Typography>

        <Typography variant="lexend_reg" sx={{ fontSize: 14 }}>
          {jd?.minExp} years
        </Typography>
      </Box>

      <Button
        sx={{
          background: 'rgb(85, 239, 196)',
          width: '-webkit-fill-available',
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
        }}
      >
        <Typography variant="lexend_med" sx={{ color: '#000000' }}>
          ⚡ Easy Apply
        </Typography>
      </Button>
    </Box>
  );
};

export default JobCard;
