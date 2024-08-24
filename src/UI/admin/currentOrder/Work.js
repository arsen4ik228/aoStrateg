import * as React from 'react';
import { Box, Grid } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../BLL/admin/orderSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '@fontsource/montserrat'

const Work = () => {

  const { accountId } = useParams();
  const dispatch = useDispatch();
  


  const navigate = useNavigate(); // Получаем функцию для навигации

  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };

  useEffect(() => {
    dispatch(getOrder(accountId))
  }, [accountId]);

  const orders = useSelector((state) => state.adminOrder.orders);
    




  return (



    // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА


    <Box sx={{ flexGrow: 1, fontFamily: "'Montserrat', sans-serif" , mt:'55px'}}>
      {orders.map((element) => (
        <Grid key={element.id} container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color: element.status === 'Черновик' ? '#B4B4B4' : 'black' }} onClick={() => handleNavigation(`${element.id}`)}>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ fontSize: '14px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>№{element.orderNumber}</Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'flex-start' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                {element.fullName}
              </Box>
              <Box sx={{ fontSize: '12px', fontWeight: '400' }} >{element.organizationName}</Box>
              <Box sx={{ fontSize: '12px', fontWeight: '400', fontStyle: 'italic' }}>{element.formattedDispatchDate}</Box>
            </Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '12px', fontWeight: '400', }}>{element.status}</Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '14px', fontWeight: '400', }}>{element.SUM}</Box>
          </Grid>
        </Grid>
      ))}
    </Box>



  );
};


export default Work;
