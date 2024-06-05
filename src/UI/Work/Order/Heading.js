import * as React from 'react';
import { Box, Grid } from '@mui/material';
import vector from './src/Vector.svg'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWorkModal } from '../../../BLL/workSlice';
const Heading = () => {


  const dispatch = useDispatch();
  const { accountId, number, status } = useParams();

  // useEffect(() => {
  //   dispatch(getWorkModal({ accountId: accountId, orderId: number }));

  // }, [])

  const list = useSelector((state) => state.work?.work || []);
  const foundElement = list.find(element => element.id === number);
  const city = useSelector((state) => state.post.city);

  // Проверяем, был ли найден элемент, и извлекаем organizationName
  const organizationName = foundElement? foundElement.organizationName : null;

  const listModalOrder = useSelector(
    (state) => state.work?.workModalOrder || {});
  const orderNumber = listModalOrder.orderNumber;

  const navigate = useNavigate(); // Получаем функцию для навигации
  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ height: '120px', borderBottom: '1px solid #B4B4B4' }}>
        {/* Колонка 1 */}
        <Grid container sx={{ height: '60px', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#3A3A3A', mt: '20px' }}>Заказ № {orderNumber}</Box>
        </Grid>

        <Grid container item xs={6} sx={{ height: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation('SelectCity')}>
          <Box sx={{ fontSize: '16px', fontWeight: 'Montserrat', fontWeight: '600', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#3A3A3A', ml: '30px' }}> 
          {city && status === "Черновик" ? city : organizationName}
          </Box>
        </Grid>

        <Grid container item xs={6} sx={{ height: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation('SelectCity')}>
          <Box sx={{ ml: '131px', pr: '26px' }}><img src={vector} alt="картинка" /></Box>
        </Grid>

      </Grid>
    </Box>
  );
};


export default Heading;
