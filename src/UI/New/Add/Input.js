import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setquantity } from '../../../BLL/postSlice';



const Input = ({onQuantityChange}) => {


  
const [quantity, setQuantity] = useState('');
const dispatch = useDispatch();

const handleInputChange = (e) => {
  const newQuantity = e.target.value;
    setQuantity(newQuantity);
  onQuantityChange(newQuantity);
};
useEffect(() => {
  if (quantity!== '') {
    dispatch(setquantity(quantity));
  }
}, [quantity, dispatch]);


  return (
    <Box
      sx={{
        width: '100%',
        height: '92px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Необходимо для позиционирования псевдоэлемента
              '&::after': { // Используем псевдоэлемент ::after
                content: '" "', // Необходимо для отображения псевдоэлемента
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: '#B4B4B4',
              },
      }}
    >
      <Typography variant="body1" sx={{ mr: 12, pt:"41px",pb:"11px", color: '#3A3A3A', fontWeight: '500', fontWeight: 'Montserrat', fontSize: '18px', lineHeight: '22px', }}>Количество:</Typography>
      < TextField type="number" variant="standard" value={quantity} onChange={handleInputChange}
      sx={{
        pt:"47px", 
        pb:"19px",
        '& input':{ color: '#3A3A3A'},
        width: '90px',        
        '&.MuiFilledInput-root': { // Находим корневой элемент filled input и меняем цвет линии
          borderColor: '#005475', 
        },
      }}
    />
    </Box>
  );
};

export default Input;
