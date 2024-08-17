import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getWork } from '../../../BLL/workSlice';
import { setCity } from '../../../BLL/postSlice';
import '@fontsource/montserrat';

const CitySelection = () => {
  const { accountId } = useParams();
  const dispatch = useDispatch();

  // Добавляем состояние для хранения выбранного значения
  const [selectedValue, setSelectedValue] = React.useState('');

  useEffect(() => {
    dispatch(getWork(accountId));
  }, [accountId, dispatch]);

  const list = useSelector((state) => state.work?.organizationList || []);

  const navigate = useNavigate();
  // Функция обработки изменения значения
  const handleChange = (event) => {
    const selectedCity = event.target.value; // Получаем выбранное значение
    setSelectedValue(selectedCity); // Обновляем локальное состояние
    dispatch(setCity(selectedCity)); // Отправляем действие для обновления состояния city в хранилище
    navigate(-1);
  };

  return (
    
    <RadioGroup row aria-label="city" name="row-radio-buttons-group" value={selectedValue} onChange={handleChange}>
    <Grid container spacing={2} direction="column" alignItems="flex-start">
      {list.map((element, index) => (
        <Grid item key={index} width={'100%'} justifyContent="center" sx={{ borderBottom: '1px solid #B4B4B4', ml: '10px', paddingBottom: '10px',fontFamily: "'Montserrat', sans-serif"}}>
          <FormControlLabel value={element} control={<Radio />} label={
          <span style={{ fontFamily: "'Montserrat', sans-serif" }}>{element}</span>
        } />
        </Grid>
          ))}
        </Grid>
      </RadioGroup>
    
  );
};

export default CitySelection;
