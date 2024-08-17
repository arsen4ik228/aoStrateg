import * as React from 'react';
import { Box, Grid } from '@mui/material';
import vector from './src/Vector.svg';
import { useParams, useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';


const Heading = () => {


  const { number, status } = useParams();

  const list = useSelector((state) => state.work?.work || []);
  const foundElement = list.find(element => element.id === number);
  const city = useSelector((state) => state.post.city);

  const organizationName = foundElement ? foundElement.organizationName : null;

  const listModalOrder = useSelector(
    (state) => state.work?.workModalOrder || {}
  );
  const orderNumber = listModalOrder.orderNumber;

  const navigate = useNavigate();
  const handleNavigation = (link) => {
    if (status === "Черновик") {
      navigate(`${link}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ height: '120px', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }}>
        <Grid container sx={{ height: '60px', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ fontSize: '18px', fontWeight: '500', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#3A3A3A', mt: '20px' }}>Заказ № {orderNumber}</Box>
        </Grid>

        <Grid container item xs={6} sx={{ height: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation('SelectCity')}>
          <Box sx={{ fontSize: '16px', fontWeight: '600', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#3A3A3A', ml: '30px' }}>
            {city && status === "Черновик" ? city : organizationName}
          </Box>
        </Grid>

        <Grid container item xs={6} sx={{ height: '60px', justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation('SelectCity')}>
          <Box sx={{ ml: '131px', pr: '26px' }}>
            {status === "Черновик" && <img src={vector} alt="картинка" />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Heading;
