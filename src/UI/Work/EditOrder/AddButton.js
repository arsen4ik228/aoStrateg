import React, { useEffect } from 'react';
import { Button, Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorkModal, putOrders } from '../../../BLL/workSlice';
import { updateTitleOrder } from '../../../BLL/workSlice';
const AddButton = () => {
  const dispatch = useDispatch();
  const { accountId, number,bookletId } = useParams(); // Используйте 'number' вместо 'productId'

  const post = useSelector((state) => state.post);

  const titlesToUpdate = [];

useEffect(() => {
  dispatch(getWorkModal({accountId: accountId, orderId: number}));
}, accountId)

  const listModalOrder = useSelector(
    (state) => state.work?.workModalOrder || {}
  );
  
  const workModalTitles = useSelector((state) => state.work?.workModalTitles || {});
  const selectedProductId = workModalTitles.find(title => title.id === bookletId);
  const handleClick = () => {
    if (post.quantity !== 0) {
      const addBooklet = post.booklet === 'Доп.буклет'; // Преобразование строки в boolean

      titlesToUpdate.push({
        id: bookletId,
        productId: selectedProductId.productId,
        accessType: post.accessType,
        generation: post.generation,
        quantity: post.quantity,
        addBooklet: addBooklet,
      });

      dispatch(
        updateTitleOrder({
          accountId: accountId,
          orderId: listModalOrder.id,
          titlesToUpdate: titlesToUpdate,
        },
      ));
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
