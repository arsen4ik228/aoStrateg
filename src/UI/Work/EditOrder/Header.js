import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../../Menu/MenuBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Импорт иконки стрелки назад
import {useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen
  const {accountId} = useParams();
  const list = useSelector((state) => state.work.work);
  const goWork = () => navigate(`/${accountId}/work`);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
    
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
        <IconButton edge="start" aria-label="back" sx={{ color: '#005475' }} onClick={() => goBack()}> {/* Изменение edge на start для размещения кнопки слева */}
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500'  }}>
            Редактировать
          </Typography>
          <IconButton onClick={() => goWork()}>
          <Badge badgeContent={list.length ? list.length : "0" } sx={{
              "& .MuiBadge-badge": {
                backgroundColor:"#005475", // Установка фона в синий или #005475 в зависимости от условия
                color:"white",// Установка цвета текста в белый
                border: "2px solid white",// Установка белого контура
                width: '26px', // Изменение ширины
                height: '26px', // Изменение высоты
                borderRadius: '50%', // Сделать круглым
                fontSize: '15px',
              },
            }}></Badge>

          </IconButton>
          <IconButton edge="end" aria-label="menu" sx={{ color: '#005475' }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MenuBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} /> {/* Передаем toggleDrawer и drawerOpen в MenuBar */}
    </div>
  );
};

export default Header;
