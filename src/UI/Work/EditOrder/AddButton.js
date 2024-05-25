import React from 'react';
import { Button,Box, Grid } from '@mui/material';

const AddButton = () => {
  return (
      <Box
        sx={{
          
          display: 'flex', // Используем flexbox для расположения
          justifyContent: 'center', // Центрируем по горизонтали
          alignItems: 'center', // Центрируем по вертикали
          height: 'auto', // Высота определяется содержимым
          width: 'auto', // Ширина определяется содержимым
          // mt: { xs: 4, sm: 8 }, // Задаем отступ сверху для разных размеров экрана
        // '@media (max-height: 744px)': {
        //   alignItems: 'flex-start',
        //   justifyContent: 'flex-start',
        //   display: 'flex',
        //   height: 'auto', // Высота определяется содержимым
        //   width: 'auto',
          
        // },
        }}
      >
    <Button variant="contained" 
    sx={{
      mt: 4,
      width: '210px', // Задаем ширину кнопки
      height: '48px', // Задаем высоту кнопки
      fontSize: '18px', // Изменяем размер текста
      fontWeight: 'Montserrat', // Устанавливаем жирность текста
      fontWeight: '700',
      backgroundColor: '#005475',
      textTransform: 'none',
      '@media (max-height: 748px)':{mt:3},
      '@media (max-height: 736px)':{mt:2},
      '@media (max-height: 725px)':{mt:1},
    }}
    >
      Добавить в заказ
    </Button>
    </Box>
  );
};

export default AddButton;
