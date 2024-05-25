// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../Menu/MenuBar';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500' }}>
            В работе
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
