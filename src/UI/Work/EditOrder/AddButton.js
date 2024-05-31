import React from 'react';
import { Button,Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const AddButton = () => {
  
  // const handleClick = (
  //   orderId,
  //   productId,
  //   accessType,
  //   generation,
  //   addBooklet,
  //   quantity
  // ) => {
  //   if (countStates[orderId] > 0) {
  //     setIsDisabledStates({ ...isDisabledStates, [orderId]: true });


  //     dispatch(
  //       putOrders({
  //         accountId: accountId,
  //         productData: {
  //           productId: productId,
  //           accessType: accessType,
  //           generation: generation,
  //           addBooklet: addBooklet,
  //           quantity: quantity,
  //         },
  //       })
  //     ).then(()=>{
  //       dispatch(getWork(accountId));
  //     });
    
  //   }
  // };
  const generation = useSelector((state) => state.post);
  
  const testClick =() => {

    console.log(generation)
  };
  
  return (
      <Box
        sx={{
          
          display: 'flex', // Используем flexbox для расположения
          justifyContent: 'center', // Центрируем по горизонтали
          alignItems: 'center', // Центрируем по вертикали
          height: 'auto', // Высота определяется содержимым
          width: 'auto', // Ширина определяется содержимым
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
        onClick={()=> testClick()}
        >
          Добавить в заказ
        </Button>
    </Box>
  );
};

export default AddButton;
