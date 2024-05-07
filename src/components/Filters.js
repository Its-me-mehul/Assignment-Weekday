import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  Divider,
  Autocomplete,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { ArrowBackIos, KeyboardArrowDown } from '@mui/icons-material';

const Filters = ({ filters, setFilters }) => {
  const rolesOptions = [
    { label: 'Frontend', value: 'Frontend' },
    { label: 'Backend', value: 'Backend' },
    { label: 'Tech Lead', value: 'Tech Lead' },
    { label: 'Ios', value: 'Ios' },
    { label: 'Android', value: 'Android' },
  ];

  const numberOfEmployeesOptions = [
    { label: '1-10', value: { min: 1, max: 10 } },
    { label: '11-20', value: { min: 11, max: 20 } },
    { label: '21-50', value: { min: 21, max: 50 } },
    { label: '50+', value: { min: 51, max: 1000 } },
  ];

  const experienceOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
  ];

  const minBaseSalaryOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
    { label: '30', value: 30 },
    { label: '100', value: 100 },
  ];

  const officeTypeOptions = [
    { label: 'Remote', value: 'Remote' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'In-Office', value: 'In-Office' },
  ];

  const techStackOptions = [
    { label: 'React', value: 'React' },
    { label: 'HTML', value: 'HTML' },
    { label: 'CSS', value: 'CSS' },
    { label: 'Javascript', value: 'javascript' },
  ];

  const handleFilterChange = (e) => {
    console.log(e.target.value);
  };

  const compsnyNameFilter = (e) => {
    console.log(e.target.value);
  };

  return (
    <Box
      sx={{ my: 2, flexWrap: 'wrap', alignItems: 'flex-end', display: 'flex' }}
    >
      <Select
        value={filters?.role}
        // label="roles"
        onChange={(e) => {
          console.log(e.target.value);
          setFilters({ ...filters, role: e.target.value?.toLowerCase() });
        }}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography variant="lexend_reg" sx={{ color: '#AAAAAA' }}>
                Roles
              </Typography>
            );
          }

          return selected;
        }}
        input={<OutlinedInput />}
        IconComponent={KeyboardArrowDown}
        sx={{ m: 1, minWidth: 150, typography: 'lexend_reg' }}
      >
        {rolesOptions?.map((r) => {
          return (
            <MenuItem
              key={r.label}
              sx={{ typography: 'lexend_reg' }}
              value={r.value}
            >
              {r.label}
            </MenuItem>
          );
        })}
      </Select>

      <Select
        value={filters?.noOfEmployees}
        // label="roles"
        onChange={(e) => {
          console.log(e.target);
          setFilters({ ...filters, noOfEmployees: e.target.value });
        }}
        displayEmpty
        renderValue={(selected) => {
          if (!selected?.min && !selected?.max) {
            return (
              <Typography variant="lexend_reg" sx={{ color: '#AAAAAA' }}>
                Number of Employees
              </Typography>
            );
          }

          return `${selected?.min}-${selected?.max}`;
        }}
        input={<OutlinedInput />}
        IconComponent={KeyboardArrowDown}
        sx={{ m: 1, minWidth: 150, typography: 'lexend_reg' }}
      >
        {numberOfEmployeesOptions?.map((r) => {
          return (
            <MenuItem
              key={r.label}
              sx={{ typography: 'lexend_reg' }}
              value={r.value}
            >
              {r.label}
            </MenuItem>
          );
        })}
      </Select>
      <Select
        value={filters?.minSalary}
        // label="roles"
        onChange={(e) => {
          console.log(e.target.value);
          setFilters({ ...filters, minSalary: e.target.value });
        }}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography variant="lexend_reg" sx={{ color: '#AAAAAA' }}>
                Minimum Salary Expectation
              </Typography>
            );
          }

          return selected;
        }}
        input={<OutlinedInput />}
        IconComponent={KeyboardArrowDown}
        sx={{ m: 1, minWidth: 150, typography: 'lexend_reg' }}
      >
        {minBaseSalaryOptions?.map((r) => {
          return (
            <MenuItem
              key={r.label}
              sx={{ typography: 'lexend_reg' }}
              value={r.value}
            >
              {r.label}
            </MenuItem>
          );
        })}
      </Select>

      <Select
        value={filters?.exp}
        // label="roles"
        onChange={(e) => {
          console.log(e.target.value);
          setFilters({ ...filters, exp: e.target.value });
        }}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography variant="lexend_reg" sx={{ color: '#AAAAAA' }}>
                Experience
              </Typography>
            );
          }

          return selected;
        }}
        IconComponent={KeyboardArrowDown}
        input={<OutlinedInput />}
        sx={{ m: 1, minWidth: 150, typography: 'lexend_reg' }}
      >
        {experienceOptions?.map((r) => {
          return (
            <MenuItem
              key={r.label}
              sx={{ typography: 'lexend_reg' }}
              value={r.value}
            >
              {r.label}
            </MenuItem>
          );
        })}
      </Select>

      <TextField
        // variant="standard"
        // label="Multiple values"
        placeholder={'Search Company Name'}
        sx={{
          mx: 1,
          mb: 1,
          '& input::placeholder': {
            // fontSize: '20px',
            fontFamily: 'Lexend',
          },
          '& input': {
            // fontSize: '20px',
            fontFamily: 'Lexend',
          },
          minWidth: 150,
        }}
        onChange={(e) => {
          console.log(e.target.value);
          setFilters({
            ...filters,
            companyName: e.target.value?.toLowerCase(),
          });
        }}
      />
    </Box>
  );
};

export default Filters;
