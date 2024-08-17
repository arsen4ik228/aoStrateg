// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge,Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuBar from '../Menu/MenuBar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getWork } from '../../BLL/workSlice';

const Header = ({ onNotificationClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {accountId} = useParams();
  
  const navigate = useNavigate();
  const goWork = () => navigate(`/${accountId}/work`);
  const dispatch = useDispatch();
  

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClick = () => {
    console.log('Уведомления нажаты');
    onNotificationClick();
  };

  useEffect(() => {
    dispatch(getWork(accountId));
  }, [accountId, dispatch]);
  const productsInDraft = useSelector((state) => String(state.work?.productsInDraft || ""));
  const productInDraftIdsToArray = productsInDraft ? productsInDraft.split(",") : [];
  
    let badgeContent = (
      <Box 
        sx={{
          backgroundColor: '#005475',
          color: 'white',
          padding: '8px',
          borderRadius: '50%',
          fontSize: '14px',
          minWidth: '13px', // Минимальная ширина и высота для создания круга
          minHeight: '13px',
          display: 'inline-flex', // Это поможет центрировать текст внутри круга
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {productInDraftIdsToArray.length}
      </Box>
    );
    
  //}

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontFamily: "'Montserrat', sans-serif", fontWeight: '500' }}>
            Новый
          </Typography>
          <IconButton sx={{mr: '7px'}} onClick={handleNotificationClick}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{mr: '7px'}} onClick={() => goWork()}>
            <Badge badgeContent={badgeContent}  ></Badge>
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
