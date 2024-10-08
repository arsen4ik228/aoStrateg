import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DisableSelection from './Selections/DisableSelection'; // Предполагается, что здесь находится ваш компонент DisableSelection
import ActiveSelection from './Selections/ActiveSelection'; // Предполагается, что здесь находится ваш компонент ActiveSelection
import { setAccessType, setBuklet} from '../../../BLL/postSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Selection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const options = ['Доступ', 'Доп.буклет'];

  const handleClick = (index) => {
    setActiveIndex(index);
    const option = options[index];
    dispatch(setBuklet(option)); 
  };

  useEffect(() => {
    dispatch(setBuklet('Доступ'));
    dispatch(setAccessType('Электронный'));
  }, [dispatch]);

  // Определение компонента для отображения в зависимости от activeIndex
  const ComponentToRender = () => {
    if (activeIndex === 0) {
      return <ActiveSelection />;
    } else if (activeIndex === 1) {
      return <DisableSelection />;
    }
    // Можно добавить дополнительные условия для других индексов, если потребуется
    return null; // Возвращаем null, если ни одно из условий не выполнено
  };

  return (
    <>
      <Grid container alignItems="center">
        {options.map((option, index) => (
          <Grid item xs={6} key={index}>
            <Box sx={{ width: '100%', height: '92px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', '&::after': { content: '" "', position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', backgroundColor: '#B4B4B4', }, }}>
              <Typography onClick={() => handleClick(index)} sx={{
                pt: "51px", pb: "19px", color: activeIndex === index? '#005475' : '#B4B4B4',
                '&::after': {
                  content: '" "',
                  position: 'absolute',
                  bottom: '1px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: activeIndex === index? "#005475" : 'transparent',
                },
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '18px',
              }}>
                {option}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ComponentToRender />
    </>
  );
};

export default Selection;
