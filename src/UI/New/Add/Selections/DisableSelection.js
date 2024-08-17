import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';

const DisableSelection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // eslint-disable-next-line 
  const [isDisabled, setIsDisabled] = useState(true); 

  const options = ['Электронный', 'Бумажный'];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <Grid container alignItems="center">
      {options.map((option, index) => (
        <Grid item xs={6} key={index}>
          <Box sx={{ width: '100%', height: '92px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', '&::after': { content: '" "', position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#B4B4B4', }, }}>
            <Typography 
              onClick={() => handleClick(index)} 
              sx={{
                pt: "51px", pb: "19px", 
                color: isDisabled? '#B4B4B4' : activeIndex === index? '#B4B4B4' : '#B4B4B4',
                cursor: isDisabled? 'not-allowed' : 'pointer',
                '&::after': {
                  content: '" "',
                  position: 'absolute',
                  bottom: '1px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  
                },
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '18px',
              }}
            >
              {option}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisableSelection;
