import React,{useState} from 'react'
import '@fontsource/montserrat'
import { Box, Grid, TextField, Checkbox,Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getEditUser} from '../../../../BLL/admin/userSlice'
import { useSelector } from 'react-redux';
const AddUser = ({onName, onLastName, onTelephone}) => {

    const {accountId, accountFocusId} = useParams()
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephoneNumber, setPhoneNumber] = useState('')

    const handleNavigation = () => {

        console.log('popka durak')
    };

    const handleChangeFirstName = (newValue) => {
        setFirstName(newValue); // Обновляем локальное состояние
        onName(newValue); // Передаём новое значение внешней функции
      };

      const handleChangeLastName = (newValue) => {
        setLastName(newValue); // Обновляем локальное состояние
        onLastName(newValue); // Передаём новое значение внешней функции
      };
    
    const handleChangeTelephone = (value) => {
        // Добавляем "+" в начало, если его нет, и обрабатываем изменение
        const newValue = value.startsWith("+") ? value : `+${value}`;
        setPhoneNumber(newValue); // Обновляем локальное состояние
        onTelephone(newValue); // Передаём новое значение внешней функции
      };

      useEffect(()=>{
        dispatch(getEditUser({acccountId: accountId, accountFocusId: accountFocusId}));
      },[accountId,accountFocusId,dispatch])

      const accountData = useSelector((state)=>(state.adminUsers?.editAccount || []));
    //   console.log(accountData)

      useEffect(()=>{
        if(accountData){
            handleChangeFirstName(accountData.firstName)
            handleChangeLastName(accountData.lastName)
            setPhoneNumber(accountData.telephoneNumber)
            onTelephone(accountData.telephoneNumber)
    }
      },[accountData])

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
                            <TextField id="standard-basic" variant="standard" size="small" value={firstName} onChange={(e) => handleChangeFirstName(e.target.value)} sx={{fontFamily: "'Montserrat', sans-serif",}} />
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
                            <TextField id="standard-basic" variant="standard" size="small" value={lastName} onChange={(e) => handleChangeLastName(e.target.value)} sx={{fontFamily: "'Montserrat', sans-serif",}} />
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
                            <TextField id="standard-basic" variant="standard" size="small" value={telephoneNumber} onChange={(e) => handleChangeTelephone(e.target.value)} sx={{fontFamily: "'Montserrat', sans-serif",}} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif",}} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} onClick={() => handleNavigation()}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Телеграм
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Box sx={{fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: '400'}}>
                            <Checkbox checked={accountData.telegramId !== null} />
                            {accountData.telegramId === null ? "Не подключён" : "Подключён"}
                        </Box>
                    </Grid>
                </Grid> 
            
            </Grid>
            {/* //////////////////// */}


       
        </>
    )
}
export default AddUser;
