// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import MenuBar from '../Menu/MenuBar';
import { useNavigate,useParams } from 'react-router-dom';
import '@fontsource/montserrat'
const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {accountId} = useParams();
  const navigate = useNavigate();
  const goAddUser = () => navigate('addUser');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '50px', }}>
      <AppBar position="static" sx={{ backgroundColor: 'white'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: '500',fontFamily: "'Montserrat', sans-serif" }}>
            Архив
          </Typography>
          {/* <IconButton edge="end" aria-label="menu" sx={{ color: '#005475', mr:'1px', fontSize: 'large' }} onClick={goAddUser}>
              <AddIcon />
          </IconButton> */}
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
