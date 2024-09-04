// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../../Menu/MenuBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate,useParams } from 'react-router-dom';
import '@fontsource/montserrat'
const Header = ({ onNotificationClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {accountId} = useParams();
  const navigate = useNavigate();
  const goAddOrder = () => navigate('addOrder');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClick = () => {
    console.log('Уведомления нажаты');
    onNotificationClick();
  };

  return (
    <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '50px', }}>
      <AppBar position="static" sx={{ backgroundColor: 'white'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: '500',fontFamily: "'Montserrat', sans-serif" }}>
            Текущие заказы
          </Typography>
          <IconButton sx={{mr: '7px'}} onClick={handleNotificationClick}>
            <NotificationsIcon />
          </IconButton>
          <IconButton edge="end" aria-label="menu" sx={{ color: '#005475', mr:'1px', fontSize: 'large' }} onClick={goAddOrder}>
              <AddIcon />
          </IconButton>
          <IconButton edge="end" aria-label="menu" sx={{ color: '#005475' }} onClick={toggleDrawer}>
              <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MenuBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
    </div>
  );
};

export default Header;
