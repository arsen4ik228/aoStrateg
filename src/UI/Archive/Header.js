// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../Menu/MenuBar';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate,useParams } from 'react-router-dom';


const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen

  const {accountId} = useParams();
  const navigate = useNavigate();
  const goNew = () => navigate(`/${accountId}/new`);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: 'Montserrat', fontWeight: '500' }}>
            Архив
          </Typography>
          <IconButton edge="end" aria-label="menu" sx={{ color: '#005475', mr:'1px', fontSize: 'large' }} onClick={goNew}>
              <AddIcon />
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
