import React, { useEffect } from "react";
import { Box, Grid } from '@mui/material';
import { NavLink,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCompleted } from '../../BLL/completedSlice';
const Record = () => {


  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  useEffect(() => {
    dispatch(getCompleted(accountId)); // Передаем accountId в getCompleted
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  const list = useSelector((state) => state.completed.completed);

  return (
    // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА


      <Box sx={{ flexGrow: 1 }}> {/* Добавляем внутренний отступ для удобства чтения */}
        {list.map((element) => ( 
          <NavLink to={`${element.orderNumber}`}className="no-style-link">
        <Grid key={element.id} container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4' }}>
          {/* Колонка 1 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ fontSize: '16px', fontWeight: 'Montserrat', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.orderNumber}</Box>
          </Grid>

          {/* Колонка 2 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '16px', fontWeight: 'Montserrat', fontWeight: '600', color: '#B4B4B4' }}>{element.organizationName}</Box>
              <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400', color: '#B4B4B4' }} >{element.SUM}</Box>
              <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400', fontStyle: 'italic', color: '#B4B4B4' }}>{element.dispatchDate}</Box>
            </Box>
          </Grid>

          {/* Колонка 3 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          </Grid>

          {/* Колонка 4 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          </Grid>
        </Grid>
        </NavLink>
        ))}
      
      </Box>

   
  );
};


export default Record;
