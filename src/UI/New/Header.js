// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../Menu/MenuBar';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen
  const {accountId} = useParams();
  const list = useSelector((state) => state.work.work);
  const navigate = useNavigate();
  const goWork = () => navigate(`/${accountId}/work`);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500' }}>
            Новый
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
