import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
const TabsComponents = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event,newValue) => { 
    setValue(newValue);
  };
  const {accountId} = useParams();
  const navigate = useNavigate(); // Получаем функцию для навигации

  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`/${accountId}/new/${link}`); // Переходим на новую страницу
  };

  return (
    <>
    <Box sx={{width: '100%', bgcolor: 'background.paper', display: 'flex', justifyContent: 'center'  }}>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile sx={{ 
        width: '100%', 
        maxWidth: '1200px', 
        minWidth: '300px', 
        margin: '0 auto',
        fontFamily: 'Montserrat, sans-serif',
        borderBottom: '1px solid #808080',
      }}>
          <Tab label="Начальные" onClick={() => handleNavigation('start')} sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif"}} />
          <Tab label="Основные" onClick={() => handleNavigation('main')} sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }} />
          <Tab label="Для персонала" onClick={() => handleNavigation('personal')} sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif"}}  />
          {/* <Tab label="Депозит" sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }} /> */}
      </Tabs>
    </Box>
    </>  

);
};

export default TabsComponents
