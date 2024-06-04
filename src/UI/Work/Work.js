import * as React from 'react';
import { Box, Grid } from '@mui/material';
import send from './src/Vector.svg'
import { getWork } from '../../BLL/workSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateDraft } from '../../BLL/workSlice';
import { setCity } from '../../BLL/postSlice';

const Work = () => {

  const { accountId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWork(accountId));
  }, [accountId]);

  const list = useSelector((state) => state.work?.work || []);
  const city = useSelector((state) => state.post.city);

  const navigate = useNavigate(); // Получаем функцию для навигации

  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };

  function sortElementsByStatus(a, b) {
    if (a.status === "Черновик" && b.status !== "Черновик") {
      return -1;
    }
    if (a.status !== "Черновик" && b.status === "Черновик") {
      return 1;
    }

    return 0; // порядок остальных элементов не изменяется
  };
  const sortedList = [...list].sort(sortElementsByStatus);

  const handleIconClick = (orderId, organizationName) => {
    // Определяем, что передавать в updateDraft
    const organizationNameToPass = city ? city : organizationName;

    dispatch(
      updateDraft({
        accountId: accountId,
        orderId: orderId,
        organizationName: organizationNameToPass,

      })
    ).then(() => { dispatch(getWork(accountId)) });
    dispatch(setCity(''));
  }
  return (



    // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА


    <Box sx={{ flexGrow: 1 }}>
      {sortedList.map((element) => (

        <Grid container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color: element.status === 'Черновик' ? '#B4B4B4' : 'black' }} >
          {/* Колонка 1 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation(`${element.id}/${element.status}`)}>
            <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>№{element.orderNumber}</Box>
          </Grid>

          {/* Колонка 2 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center' }} onClick={() => handleNavigation(`${element.id}/${element.status}`)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '14px', fontWeight: 'Montserrat', fontWeight: '600' }}>
                {city && element.status === 'Черновик' ? city : element.organizationName}
              </Box>
              <Box sx={{ fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400' }} >{element.SUM}</Box>
              <Box sx={{ fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400', fontStyle: 'italic' }}>{element.dispatchDate}</Box>
            </Box>
          </Grid>

          {/* Колонка 3 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation(`${element.id}/${element.status}`)}>
            <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '12px', fontWeight: 'Montserrat', fontWeight: '400', }}>{element.status}</Box>
          </Grid>

          {/* Колонка 4 */}
          {element.status === 'Черновик' && (
            <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={send} alt="Картинка" width="24" height="24" style={{ maxWidth: '100%', maxHeight: '100%' }} onClick={() => handleIconClick(element.id, element.organizationName)} />
            </Grid>
          )}
        </Grid>
      ))}
    </Box>

  );
};


export default Work;
