import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { setGeneration } from '../../../BLL/postSlice';
import { useDispatch } from 'react-redux';


const SelectionBlock = () => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const options = ['1-ое поколение','2-ое поколение'];
  const generationMap = {
    '1-ое поколение': 'Первое поколение',
    '2-ое поколение': 'Второе поколение',
  };

  useEffect(() => {
    dispatch(setGeneration('Первое поколение'));
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);
    const option = options[index];
    const translatedOption = generationMap[option];
    dispatch(setGeneration(translatedOption)); // Установите выбранное поколение
  };
 
  return (

    <Grid container alignItems="center" >
      {options.map((option, index) => (

        <Grid item xs={6} key={index}>
          <Box sx={{ width: '100%', height: '92px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', '&::after': { content: '" "', position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#B4B4B4', }, }}>
            <Typography onClick={() => handleClick(index)} sx={{
              pt: "51px", pb: "19px", color: activeIndex === index ? '#005475' : '#B4B4B4',
              '&::after': {
                content: '" "',
                position: 'absolute',
                bottom: '1px', // Расположение линии под Typography
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: activeIndex === index ? "#005475" : 'transparent', // Видимость линии зависит от состояния
              },
              fontWeight: "500",
              fontFamily: "'Montserrat', sans-serif" ,
              fontSize: '18px',
            }}>
              {option}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectionBlock;