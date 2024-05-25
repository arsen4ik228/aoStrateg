import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';

const cities = [
  { value: 'moscow', label: 'Москва' },
  { value: 'saintPetersburg', label: 'Санкт-Петербург' },
  { value: 'novosibirsk', label: 'Новосибирск' },
  // Добавьте больше городов по мере необходимости
];

const CitySelection = () => {
  const [value, setValue] = React.useState('moscow');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="city" name="row-radio-buttons-group" value={value} onChange={handleChange}>
        <Grid container spacing={2} direction="column" alignItems="flex-start" justifyContent="center" >
          {cities.map((city) => (
            <Grid item key={city.value} width={'1024px'} sx={{borderBottom: '1px solid #B4B4B4',ml:'10px'}}>
              <FormControlLabel value={city.value} control={<Radio />} label={city.label} />
              {/* <hr color='#B4B4B4' width='1024px' style={{marginTop:'18px'}}/> */}
            </Grid>
            
          ))}
           
        </Grid>
       
        
      </RadioGroup>
    </FormControl>
  );
};

export default CitySelection;
