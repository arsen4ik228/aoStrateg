import * as React from 'react';
import { Box, Grid } from '@mui/material';
import send from './src/Vector.svg'
import { NavLink } from 'react-router-dom';
import style from './Work.module.css';
const images = {
    0: send,
    1: "path/to/image2.png",
};
const Work = ({ imageKey }) => {
    const imagePath = images[imageKey];
    return (



        // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА


        <NavLink to="order" className="no-style-link">
        <Box sx={{ flexGrow: 1 }}> 
          <Grid container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color:'black' }}>
            {/* Колонка 1 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400', mr:'30px',ml:'30px',textAlign: 'center', justifyContent: 'center',alignItems: 'center' }}>№ 24</Box>
            </Grid>
    
            {/* Колонка 2 */}
            <Grid container item xs={3} sx={{justifyContent: 'center'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '600'}}>Новосибирск</Box>
                <Box sx={{ fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400'}} >57 000</Box>
                <Box sx={{ fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400', fontStyle:'italic'}}>16.08.23</Box>
              </Box>
            </Grid>
    
            {/* Колонка 3 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{ml:'25px', textAlign: 'center', fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400' }}>активный</Box>
            </Grid>
    
            {/* Колонка 4 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <img src={imagePath} alt="Картинка" width="24" height="24" style={{ maxWidth: '100%', maxHeight: '100%' }}  />
            </Grid>
          </Grid>
        </Box>
        </NavLink>
      );
    };
    

export default Work;
