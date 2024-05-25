import React, {useState} from 'react';
import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import PhotoGallery from './StartGallery';
import {NavLink, useNavigate} from 'react-router-dom'
const TabsComponents = () => {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <Box sx={{width: '100%', bgcolor: 'background.paper', display: 'flex', justifyContent: 'center'  }}>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile sx={{ 
        width: '100%', 
        maxWidth: '1200px', 
        minWidth: '300px', 
        margin: '0 auto',
        fontFamily: 'Montserrat, sans-serif',
        borderBottom: '1px solid #808080',
      }}>
        <NavLink to="start" className="no-style-link">
          <Tab label="Начальные" sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontWeight: 'Montserrat' }} />
        </NavLink>
        <NavLink to="main" className="no-style-link">
          <Tab label="Основные" sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontWeight: 'Montserrat' }} />
        </NavLink>
        <NavLink to="personal" className="no-style-link">
          <Tab label="Для персонала" sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontWeight: 'Montserrat'}}  />
        </NavLink>
        <Tab label="Депозит" sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontWeight: 'Montserrat' }} />
      </Tabs>
    </Box>

    </>  

);
};

export default TabsComponents
