// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';
 import book from './src/book.svg'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from '../../BLL/productSlice';
import style from './PhotoGallery.module.css'; // Убедитесь, что файл CSS импортирован
import { NavLink } from 'react-router-dom';


const PersonalGallery = () => {
  
  const dispatch = useDispatch();
  const { accountId } = useParams();

  useEffect(() => {
    dispatch(getProducts({ accountId: accountId, typeId: 3 }));
  }, [accountId]);

  const booklets = useSelector((state) => state.products.productsStart);

  return (
    <div className={style.photoGallery}>
      {booklets.map((booklet) => (
              <NavLink to={`${booklet.id}`} className="no-style-link">

        <div key={booklet.id} className={style.photoItem}>
          <img src={book} alt='picture' className={style.photo} />
          <div className={style.photoTitle}>{booklet.abbreviation}</div>
        </div>
      </NavLink>
      ))}
    </div>
    
  );
};

export default PersonalGallery;
