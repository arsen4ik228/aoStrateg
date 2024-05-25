import book from './book.svg';
import React from 'react';
import { Grid, Box } from '@mui/material';

const ImageWithDescriptions = () => {

  return (
    <Grid  container direction="column" alignItems="center" sx={{ minHeight: '210px' }}>

      <Box sx={{ width: '100%', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: '#F1F5F9', m: "1px", pt: "15px", }} >
        <img src={book} alt="Описание изображения" style={{ width: '100px', height: 'auto', objectFit: 'cover', }} />
        
        <Box sx={{ mt: 1, color: '#FF0000', m: "1px", fontWeight: 'Montserrat', fontWeight: '500'}}
        >КОК</Box>
        
        <Box sx={{ mt: 1, color: '#999999', m: "0px", pb: "15px", fontWeight: 'Montserrat', fontWeight: '600'}}
        >Как правильно делегировать</Box>
      </Box>

    </Grid>
  );
};

export default ImageWithDescriptions;
