import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const Booklet = () => {
    

  const listModalTitles = useSelector(
    (state) => state.work.workModalTitles
  );

    return (



        // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА



        <Box sx={{ flexGrow: 1,  }}> {/* Добавляем внутренний отступ для удобства чтения */}
        {listModalTitles.map((element) => (
          <Grid container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', }}>
            {/* Колонка 1 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{fontSize: '16px', fontWeight: 'Montserrat', fontWeight: '400', mr:'30px',ml:'30px',textAlign: 'center', justifyContent: 'center',alignItems: 'center' }}>{element.quantity}</Box>
            </Grid>
    
            {/* Колонка 2 */}
            <Grid container item xs={3} sx={{justifyContent: 'center'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Box sx={{ fontSize: '16px', fontWeight: 'Montserrat', fontWeight: '600'}}>{element.product.abbreviation}</Box>
                <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400'}} >{element.addBooklet? 'Доп.буклет' : 'Доступ'}</Box>
                <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400', fontStyle:'italic'}}>{element.accessType}</Box>
              </Box>
            </Grid>
    
            {/* Колонка 3 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
              <Box sx={{ml:'25px', textAlign: 'center', fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400' }}>{element.generation}</Box>
            </Grid>
    
            {/* Колонка 4 */}
            <Grid container item xs={3} sx={{justifyContent: 'center',alignItems: 'center'}}>
            </Grid>
          </Grid>
          ))}
        </Box>
      );
    };
    

export default Booklet;
