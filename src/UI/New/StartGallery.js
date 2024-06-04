// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';
 import book from './src/book.svg'

import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from '../../BLL/productSlice';
import style from './PhotoGallery.module.css'; // Убедитесь, что файл CSS импортирован
import { useNavigate } from 'react-router-dom';

const StartGallery = () => {
  


  const dispatch = useDispatch();
  const { accountId } = useParams();
  useEffect(() => {
    dispatch(getProducts({ accountId: accountId, typeId: 1 }));
  }, [accountId]);

  const navigate = useNavigate();
  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };

  const booklets = useSelector((state) => state.products.productsStart);

  return (
    
    <div className={style.photoGallery}>
      {booklets.map((booklet) => (
        <div key={booklet.id} className={style.photoItem} onClick={() => handleNavigation(`${booklet.id}`)}>
          <img src={book} alt='picture' className={style.photo} />
          <div className={style.photoTitle}>{booklet.abbreviation}</div>
        </div>
      ))}
    </div>
    
  );
};

export default StartGallery;
