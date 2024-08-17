import React from 'react';
import { Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { putOrders } from '../../../BLL/workSlice';
import { useNavigate } from 'react-router-dom';
import { setProductIds } from '../../../BLL/postSlice';

const AddButton = ({ quantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { accountId, number } = useParams(); // Используйте 'number' вместо 'productId'

  const post = useSelector((state) => state.post);
  const handleClick = async () => {
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
      }))        
        dispatch(setProductIds([...post.productIds, number]))
        goBack();
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
        disabled={(!quantity) || (parseInt(quantity) <= 0)}
        sx={{
          mt: 4,
          width: '210px',
          height: '48px',
          fontSize: '18px',
          fontFamily: "'Montserrat', sans-serif",
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
