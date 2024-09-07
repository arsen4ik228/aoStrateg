// Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton,  } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../../Menu/MenuBar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Импорт иконки стрелки назад
import AddIcon from '@mui/icons-material/Add';
import AddReciever from './AddReciever';
import { useNavigate,useParams } from 'react-router-dom';

const Header = ({setDummyKey}) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen
  const {accountId,commisionRecieverId} = useParams();
  const [addModal, setAddModal] = useState(false);
  const addReciever = () => {
    setAddModal(true);
  };
  const goNew = () => {
    addReciever()
  };

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
    <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '50px', }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
        <IconButton edge="start" aria-label="back" sx={{ color: '#005475' }} onClick={() => goBack()}> {/* Изменение edge на start для размещения кнопки слева */}
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontFamily: "'Montserrat', sans-serif", fontWeight: '500' }}>
            Комиссионные
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

    <AddReciever
        isOpen={addModal}
        close={setAddModal}
        commisionRecieverId={commisionRecieverId}
        setDummyKey={setDummyKey}
      ></AddReciever>
    </>
  );
};

export default Header;
