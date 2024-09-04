import React, { useState } from 'react'
import '@fontsource/montserrat'
import { Box, Grid, TextField, Checkbox, Typography,Select,MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const AddUser = ({ onName, onLastName, onTelephone, onRole }) => {

    const handleNavigation = () => {

        console.log('popka durak')
    };

    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState();


    const handleChange = (value) => {
        // Добавляем "+" в начало, если его нет, и обрабатываем изменение
        const newValue = value.startsWith("+") ? value : `+${value}`;
        setPhoneNumber(newValue); // Обновляем локальное состояние
        onTelephone(newValue); // Передаём новое значение внешней функции
    };
    const handleChangeRole = (e) => {
        setRole(e.target.value);
        onRole(e.target.value)
      }
    return (
        <>
            <Grid sx={{ position: 'fixed', top: 55, left: 0, bottom: 0, right: 0, width: '100%', height: '150px', zIndex: 1000 }}>
                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start', }} onClick={() => handleNavigation()}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Имя
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6}  >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => onName(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} onClick={() => handleNavigation()}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Фамилия
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6}  >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => onLastName(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} onClick={() => handleNavigation()}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Телефон
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => handleChange(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} onClick={() => handleNavigation()}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Роль
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <Select
                                label="Роль"
                                variant="standard"
                                value={role}
                                onChange={handleChangeRole}
                                sx={{ width: '150px' }}
                            >
                                <MenuItem key={3} value={3}> Пользователь </MenuItem>
                                <MenuItem key={2} value={2}> Админ </MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                </Grid>

                {/* <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif",}} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} onClick={() => handleNavigation()}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Телеграм
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} sx={{ display: 'flex', fontSize: '14px', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Box >
                            <Checkbox

                            />
                        </Box>
                    </Grid>
                </Grid>  */}













                {/* //////////// */}
                {/* <Grid container item xs={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px',mt: '14px', color: '#005475' }}>
                            Академии
                        </Box>
                        <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                    </Box>
                </Grid>
                <Grid container item xs={6} sx={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '16px', fontWeight: '500', overflow:'auto' }}>
                {organizationList.map((element) => (
                    <>
                    <Box sx={{mt:'5px',}}>
                        <Checkbox />
                        {element.organizationName}
                    </Box>
                    </>
                    ))}
                </Grid>
                {/* ///////////////// */}

            </Grid>
            {/* //////////////////// */}



        </>
    )
}
export default AddUser;
