import * as React from 'react';
import { Box, Grid } from '@mui/material';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getWorkModal } from '../../../BLL/workSlice';

const Heading = () => {
const dispatch = useDispatch();    
const {accountId,number,organizationName} = useParams();




const listModalOrder = useSelector(
  (state) => state.work?.workModalOrder || {}
);

const orderNumber = listModalOrder.orderNumber;

useEffect(() => 
{    
    dispatch(getWorkModal({ accountId: accountId, orderId: number }));

  },[])


    return (

        <Box sx={{ flexGrow: 1 }}> 
          <Grid container sx={{ height: '120px', borderBottom: '1px solid #B4B4B4' }}>
            {/* Колонка 1 */}
            <Grid container sx={{ height: '60px',justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500',textAlign: 'center', justifyContent: 'center',alignItems: 'center', color:'#3A3A3A' }}>Заказ № {orderNumber}</Box>
            </Grid>

            <Grid container item xs={6} sx={{ height: '60px',justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{fontSize: '16px', fontWeight: 'Montserrat', fontWeight: '600',textAlign: 'center', justifyContent: 'center',alignItems: 'center', color:'#BA8400', }}>{organizationName}</Box>
            </Grid>
            
            <Grid container item xs={6} sx={{ height: '60px',justifyContent: 'center',alignItems: 'center'}}>
                {/* <Box sx={{ml:'131px',pr:'26px'}}><img src={vector} alt="картинка" /></Box> */}
            </Grid>

          </Grid>
        </Box>
      );
    };
    

export default Heading;
