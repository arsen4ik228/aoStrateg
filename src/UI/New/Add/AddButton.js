import React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { putOrders } from '../../../BLL/workSlice';

const AddButton = () => {
  const dispatch = useDispatch();
  const { accountId, number } = useParams(); // Используйте 'number' вместо 'productId'

  const post = useSelector((state) => state.post);

  const handleClick = () => {
    if (post.quantity !== 0) {
      const addBooklet = post.booklet === 'Доп.буклет'; // Преобразование строки в boolean

      dispatch(putOrders({
        accountId: accountId,
        productData: {
          productId: number, // Используйте 'number' вместо 'productId'
          accessType: post.accessType,
          generation: post.generation,
          addBooklet: addBooklet, // Передаем значение addBooklet
          quantity: post.quantity,
        },
      }));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        width: 'auto',
      }}
    >
      <Button
        variant="contained"
        sx={{
          mt: 4,
          width: '210px',
          height: '48px',
          fontSize: '18px',
          fontWeight: 'Montserrat',
          fontWeight: '700',
          backgroundColor: '#005475',
          textTransform: 'none',
          '@media (max-height: 748px)': { mt: 3 },
          '@media (max-height: 736px)': { mt: 2 },
          '@media (max-height: 725px)': { mt: 1 },
        }}
        onClick={handleClick}
      >
        Добавить в заказ
      </Button>
    </Box>
  );
};

export default AddButton;