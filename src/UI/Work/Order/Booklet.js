import * as React from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getWorkModal } from '../../../BLL/workSlice';
import { useEffect, useState } from 'react';
import trash from '../src/trash.svg'
import { deleteTitleOrder } from '../../../BLL/workSlice';
import { setProductIds } from '../../../BLL/postSlice';

const Booklet = () => {
  console.log('---------------------------------');
  const dispatch = useDispatch();
  const { accountId, number, status } = useParams();
  const [dummykey, setDummyKey] = useState(0);
  const post = useSelector((state) => state.post.productIds);
  console.log(post);
  useEffect(() => {
    dispatch(getWorkModal({ accountId: accountId, orderId: number }));

  }, [dispatch, accountId, number, dummykey])

  const listModalTitles = useSelector(
    (state) => state.work.workModalTitles
  );

  const navigate = useNavigate();
  const handleNavigation = (link) => {
    if (status === "Черновик") {
      // event.stopPropagation(); // Предотвращаем всплытие события
      navigate(`${link}`);
    } // Переходим на новую страницу
  };


  const deleteClick = (titleId) => {

    dispatch(
      deleteTitleOrder({
        accountId: accountId,
        orderId: number,
        titleId: titleId,
      })
    ).then(() => {
      const index = post.findIndex(item => item.titleId === titleId);

      // Проверяем, найден ли элемент
      if (index !== -1) {
        // Создаем копию массива post, чтобы избежать мутации исходного состояния
        const updatedPost = [...post];

        // Удаляем элемент из массива
        updatedPost.splice(index, 1);
        console.log(updatedPost);
        // Обновляем состояние с помощью setProductIds
        dispatch(setProductIds(updatedPost));
      }
      setDummyKey((prevState) => prevState + 1);

    });
  }

  return (



    // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА

    <Box sx={{ flexGrow: 1, }}> {/* Добавляем внутренний отступ для удобства чтения */}
      {listModalTitles.map((element) => (
        <Grid container
          key={element.id} // Добавляем уникальный ключ здесь
          sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color: 'black', fontFamily: "'Montserrat', sans-serif" }}
        >
          {/* Колонка 1 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation(element.id)}>
            <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>{element.quantity}</Box>
          </Grid>

          {/* Колонка 2 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center' }} onClick={() => handleNavigation(element.id)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '16px', fontWeight: '600' }}>{element.product.abbreviation}</Box>
              <Box sx={{ fontSize: '14px', fontWeight: '400' }} >{element.addBooklet ? 'Доп.буклет' : 'Доступ'}</Box>
              <Box sx={{ fontSize: '14px', fontWeight: '400', fontStyle: 'italic' }}>{element.accessType}</Box>
            </Box>
          </Grid>

          {/* Колонка 3 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation(element.id)}>
            <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '14px', fontWeight: '400' }}>{element.generation}</Box>
          </Grid>

          {/* Колонка 4 */}
          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            {status === 'Черновик' ? (
              <img src={trash} alt="картинка урны" width="24" height="24" style={{ maxWidth: '100%', maxHeight: '100%' }} onClick={() => deleteClick(element.id)} />
            ) : null}
          </Grid>
        </Grid>
      ))}
    </Box>


  );
};


export default Booklet;
