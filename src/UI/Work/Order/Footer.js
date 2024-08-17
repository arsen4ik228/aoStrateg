import * as React from 'react';
import { Typography,Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Footer = () => {
  const {number} = useParams();
  const list = useSelector((state) => state.work?.work || []);
  // Находим элемент в списке по id
  const targetElement = list.find(item => item.id === number);

  // Если элемент найден, берем его поле SUM, иначе отображаем 0
  const sumValue = targetElement? targetElement.SUM : 0;

  return (
    <Box sx={{mt:'71px'}}>
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '71px',
      backgroundColor:'white',
      color: '#3A3A3A', // Белый цвет текста для контраста
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px', // Отступы внутри футера
      boxSizing: 'border-box', // Учитывать внутренние отступы в ширину
      boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.25)', // Эффект тени
    }}>
      <Typography sx={{fontFamily: "'Montserrat', sans-serif" , fontWeight: '700',fontSize:'18px',color:'#3A3A3A',lineHeight:'22px'}}>
         Итого:
      </Typography>
      <Typography sx={{fontFamily: "'Montserrat', sans-serif" , fontWeight: '700',fontSize:'18px',color:'#3A3A3A',lineHeight:'22px'}}>
        {sumValue} &#x20BD;
      </Typography>
    </footer>
    </Box>
  );
};

export default Footer;
