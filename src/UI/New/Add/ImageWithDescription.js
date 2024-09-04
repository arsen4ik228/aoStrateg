import Book from '../../src/book.svg'
import React from 'react';
import { Grid, Box } from '@mui/material';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
const ImageWithDescriptions = () => {

  const {number} = useParams();
  const booklets = useSelector((state) => state.products.productsStart);

  const booklet = booklets.find(item => item.id === number);

  console.log(booklet)
  return (
    <Grid  container direction="column"  sx={{ minHeight: '210px',fontFamily: "'Montserrat', sans-serif",alignItems:"center" }}>

      <Box sx={{ width: '100%', height: '210px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor: '#F1F5F9', m: "1px", pt: "15px", }} >
        <img src={booklet.imageId? `https://24academy.ru${booklet.imagePath?.slice(2)}` : Book} alt='booklet' loading="lazy" style={{ width: '100px', height: 'auto', objectFit: 'cover', }} />
        
        <Box sx={{ mt: 1, color: '#FF0000', m: "1px",  fontWeight: '500', justifyContent: 'center', alignItems: 'center'}}
        >{booklet.abbreviation}</Box>
        
        <Box sx={{ mt: 1, color: '#999999', m: "0px", pb: "15px", fontWeight: '600', justifyContent: 'center', alignItems: 'center'}}
        >{booklet.name.split("&quot;").join('"')}</Box>
      </Box>
     
    </Grid>
  );
};

export default ImageWithDescriptions;
