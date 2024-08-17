import Book from '../../src/book.svg'

import React from 'react';
import { Grid, Box } from '@mui/material';
import { useSelector,} from 'react-redux';
import { useParams } from 'react-router-dom';

const ImageWithDescriptions = () => {

  const {bookletId} = useParams();
  const booklets = useSelector((state) => state.work.workModalTitles);
  const booklet = booklets.find(item => item.id === bookletId);
  

 

  return (
    <Grid  container direction="column" alignItems="center" sx={{ minHeight: '210px' }}>

      <Box sx={{ width: '100%', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: '#F1F5F9', m: "1px", pt: "15px", }} >
      <img src={booklet.imageId? `https://24academy.ru${booklet.imagePath?.slice(2)}` : Book} alt='booklet' loading="lazy" style={{ width: '100px', height: 'auto', objectFit: 'cover', }} />
        
        <Box sx={{ mt: 1, color: '#FF0000', m: "1px", fontFamily: "'Montserrat', sans-serif", fontWeight: '500'}}
        >{booklet.product.abbreviation}</Box>
        
        <Box sx={{ mt: 1, color: '#999999', m: "0px", pb: "15px", fontFamily: "'Montserrat', sans-serif", fontWeight: '600'}}
        >{booklet.product.name}</Box>
      </Box>
     
    </Grid>
  );
};

export default ImageWithDescriptions;
