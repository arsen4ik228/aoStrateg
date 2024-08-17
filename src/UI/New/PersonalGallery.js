// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';
import Book from '../src/book.svg'

import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from '../../BLL/productSlice';
import style from './PhotoGallery.module.css'; // Убедитесь, что файл CSS импортирован
import { getWork } from '../../BLL/workSlice';
import { getWorkModal } from '../../BLL/workSlice';
import { useNavigate } from 'react-router-dom';

const PersonalGallery = () => {
  
  let ID = 0;
  let status = false;
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const navigate = useNavigate();
  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };
  useEffect(() => {
    dispatch(getProducts({ accountId: accountId, typeId: 3 }));
  }, [dispatch,accountId]);

  const post = useSelector((state) => state.post);
  const booklets = useSelector((state) => state.products.productsStart);

  useEffect(() => {
    dispatch(getWork(accountId));
  }, [accountId, dispatch]);
  
  const list = useSelector((state) => state.work?.work || []);
  
  // Поиск элемента с status = 'Черновик'
  const draftElement = list.find(item => item.status === 'Черновик');
  
  // Теперь, если draftElement существует, у него есть id, который вы можете использовать
  if (draftElement) {
    // console.log("Найден элемент с status='Черновик', его id:", draftElement.id);
    ID=draftElement.id;
    status = true;
  } else {
    // console.log("Элемента с status='Черновик' не найдено");
    ID=0;
    status=false;
  }
  useEffect(() => {
    if(ID != 0){
    dispatch(getWorkModal({ accountId: accountId, orderId: draftElement.id }));
    }
    else(console.log(" Не найдено"));
  }, [ID])

  const listModalTitles = useSelector(
    (state) => state.work.workModalTitles
  );
  
  const productIdsFromListModalTitles = listModalTitles.map(title => title.productId);

  // console.log(productIdsFromListModalTitles);
  

  
  // console.log(post);
  const filteredBooklets = post && Object.keys(post.productIds).length > 0? 
    booklets.filter(booklet =>!post.productIds.includes(booklet.id)) :
    (status? booklets.filter(booklet =>!productIdsFromListModalTitles.includes(booklet.id)) : booklets);

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

export default PersonalGallery;
