import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../../Menu/MenuBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Импорт иконки стрелки назад
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
        <NavLink to="EditOrder" className="no-style-link">
        <IconButton edge="start" aria-label="back" sx={{ color: '#005475' }} > {/* Изменение edge на start для размещения кнопки слева */}
            <ArrowBackIosIcon />
          </IconButton>
          </NavLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500'  }}>
            Редактировать
          </Typography>
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
