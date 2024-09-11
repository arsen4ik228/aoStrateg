import React, { useEffect } from 'react';
import work from './src/work.svg'
import archive from './src/archive.svg'
import price from './src/price.svg'
import users from './src/users.svg'
import deposit from './src/deposit.svg'
import companyLogo from './src/companyLogo.svg';
import commsion from './src/commision.svg'
import review from './src/review.svg'
import statistic from './src/statistic.svg'
import { useParams } from 'react-router-dom';

import { Box, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import '@fontsource/montserrat'
const MenuBar = ({ toggleDrawer, drawerOpen }) => {
  const drawerItems = [
    { text: 'Текущие', icon: work, path: 'currentOrders' },
    { text: 'Архив', icon: archive, path: 'archive' },
    { text: 'Прайс-листы', icon: price, path: 'priceLists' },
    { text: 'Пользователи', icon: users, path: 'users' },
    { text: 'Депозиты', icon: deposit, path: 'deposit' },
    { text: 'Комиссионные', icon: commsion, path: 'comission' },
    { text: 'Статистика', icon: statistic, path: 'statistics' },
    { text: 'Отчёты', icon: review, path: 'review' },
    { text: 'Получатель', icon: deposit, path: 'payee' },
  ];
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const handleItemClick = (path) => {
    window.location.href = `/PWA/#/${accountId}/superAdmin/${path}`;
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
            <Box display="flex" alignItems="center" sx={{fontFamily: "'Montserrat', sans-serif!important", mt:1}}>
              <ListItemIcon sx={{ marginLeft: '40px' }}>
                <img src={item.icon} alt={item.text} />
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{fontSize: '10px', color: '#F0F0F0', fontFamily: "'Montserrat', sans-serif!important", fontWeight:'600' }}/>
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
