// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';
 import Book from '../src/book.svg'

import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import { getProducts } from '../../BLL/productSlice';
import style from './PhotoGallery.module.css'; // Убедитесь, что файл CSS импортирован
import { getWork } from '../../BLL/workSlice';
import { getWorkModal } from '../../BLL/workSlice';

const StartGallery = () => {
  
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accountId } = useParams();
  
  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };

  useEffect(() => {
    dispatch(getProducts({ accountId: accountId, typeId: 1 }));
  }, [dispatch,accountId]);

  
  const booklets = useSelector((state) => state.products.productsStart);


  useEffect(() => {
    dispatch(getWork(accountId));
  }, [accountId, dispatch]);
  const draft = useSelector((state) => String(state.work?.productsInDraft || ""))
  const productInDraftIds = draft ? draft.split(",") : [];
  
  const filteredBooklets = booklets.filter(booklet => !productInDraftIds.includes(booklet.id));
  
  return (
    
    <div className={style.photoGallery}>
      {filteredBooklets.map((booklet) => (
        <div key={booklet.id} className={style.photoItem} onClick={() => handleNavigation(`${booklet.id}`)}>
        <img src={booklet.imageId? `https://24academy.ru${booklet.imagePath?.slice(2)}` : Book} alt='booklet' className={style.photo}/>
          <div className={style.photoTitle}>{booklet.abbreviation}</div>
        </div>
      ))}
    </div>
    
  );
};

export default StartGallery;
