import * as React from 'react';
import { Box, Grid } from '@mui/material';
import send from './src/Vector.svg'
import { NavLink } from 'react-router-dom';
import style from './Work.module.css';
import { getWork } from '../../BLL/workSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const images = {
    0: send,
    1: "path/to/image2.png",
};
const Work = ({ imageKey }) => {
    const imagePath = images[imageKey];

    const {accountId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getWork(accountId));
    },[accountId]);

    const list = useSelector((state) => state.work?.work || []);
    const productsModal = useSelector((state) => state.work.products);
    console.log(productsModal);

    return (



        // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА


        <Box sx={{ flexGrow: 1 }}>
          {list.map((element) => (
        <NavLink to={`${element.id}`} className="no-style-link">

          <Grid container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color:'black' }}>
            {/* Колонка 1 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400', mr:'30px',ml:'30px',textAlign: 'center', justifyContent: 'center',alignItems: 'center' }}>№{element.orderNumber}</Box>
            </Grid>
    
            {/* Колонка 2 */}
            <Grid container item xs={3} sx={{justifyContent: 'center'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '600'}}>{element.organizationName}</Box>
                <Box sx={{ fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400'}} >{element.SUM}</Box>
                <Box sx={{ fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400', fontStyle:'italic'}}>{element.dispatchDate}</Box>
              </Box>
            </Grid>
    
            {/* Колонка 3 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{ml:'25px', textAlign: 'center', fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400' }}>{element.status}</Box>
            </Grid>
    
            {/* Колонка 4 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <img src={imagePath} alt="Картинка" width="24" height="24" style={{ maxWidth: '100%', maxHeight: '100%' }}  />
            </Grid>
          </Grid>
          </NavLink>
          ))} 
        </Box>
      
      );
    };
    

export default Work;
