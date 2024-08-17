import React from 'react';
import work from './src/stats.svg';
import neww from './src/new.svg';
import archive from './src/Vector.svg';
import companyLogo from './src/companyLogo.svg';
import { useParams } from 'react-router-dom';

import { Box, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import '@fontsource/montserrat'
const MenuBar = ({ toggleDrawer, drawerOpen }) => {
  const drawerItems = [
    { text: 'Новый', icon: neww, path: 'new' },
    { text: 'В работе', icon: work, path: 'work' },
    { text: 'Архив', icon: archive, path: 'archive' },
  ];
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const handleItemClick = (path) => {
    window.location.href = `/PWA/#/${accountId}/${path}`;
  };
  
  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List sx={{ backgroundColor: '#005475', fontFamily: "'Montserrat', sans-serif!important"}}>
        {drawerItems.map((item, index) => (
          <ListItem button key={index} onClick={() => handleItemClick(item.path)}>
            <Box display="flex" alignItems="center" sx={{fontFamily: "'Montserrat', sans-serif!important"}}>
              <ListItemIcon sx={{ marginLeft: '40px' }}>
                <img src={item.icon} alt={item.text} />
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ marginLeft: '10px', fontSize: '10px', color: '#F0F0F0', fontFamily: "'Montserrat', sans-serif!important", fontWeight:'600' }}/>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      PaperProps={{ sx: { width: '75%', backgroundColor: '#005475' } }}
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
    >
      <Grid item sx={{ marginBottom: '30px' }}>
        <img src={companyLogo} alt="Логотип компании" style={{ width: 'auto', height: 'auto', marginLeft: '40px', marginTop: '12px' }} />
      </Grid>
      {list()}
    </SwipeableDrawer>
  );
};

export default MenuBar;
