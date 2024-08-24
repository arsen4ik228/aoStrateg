import React from 'react'
import { Box, Grid, TextField, Checkbox,Button } from '@mui/material'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPriceList } from '../../../../BLL/admin/priceListSlice';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postPrice } from '../../../../BLL/admin/priceListSlice';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const BookletInfo = ({productId}) => {

    const [abbreviation, setAbbreviation] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [dop, setDop] = useState('')
    const [date, setDate] = useState(dayjs())

    const accountId = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPriceList({ accountId: accountId }));
      }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

      const handleAdd = () => {
        dispatch(
          postPrice({
            accountId: accountId,
            productTypeId: productId,
            name: name,
            abbreviation: abbreviation,
            priceAccess: price,
            priceBooklet: dop,
            activationDate: date ? date : dayjs(),
            //selectedFile,
          })
        ).then(() => {
          dispatch(getPriceList(accountId));
        });
      };
      
      
    return (
        <>
            <Grid sx={{}}>
                <Grid container sx={{ height: '195px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                    <Box sx={{ height: '100px' }}></Box>
                    {/* <Grid container item xs={6} sx={{ justifyContent: 'flex-start', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Аббр.:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6}  >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => setAbbreviation(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid> */}
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start', }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Аббр.:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6}  >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => setAbbreviation(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Название:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6}  >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => setName(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                {/* <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Поколение:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Box sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: '400', }}>
                            <Checkbox />
                            1-ое
                        </Box>
                        <Box sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: '400', ml: 2 }}>
                            <Checkbox />
                            2-ое
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Доступ:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Box sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: '400', }}>
                            <Checkbox />
                            Бумаж.
                        </Box>
                        <Box sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: '400', }}>
                            <Checkbox />
                            Электр.
                        </Box>
                    </Grid>
                </Grid> */}

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Цена:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => setPrice(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                Доп.:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <TextField id="standard-basic" variant="standard" size="small" onChange={(e) => setDop(e.target.value)} sx={{ fontFamily: "'Montserrat', sans-serif", }} />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '80px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

                    <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                С даты:
                            </Box>
                            <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
                        </Box>
                    </Grid>
                    <Grid container item xs={6} >
                        <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    format="DD.MM.YYYY"
                                    value={date}
                                    onChange={setDate}
                                    sx={{
                                        width: '170px', // Устанавливает ширину календаря
                                        '& .MuiPickersModal-dialog': {
                                            width: '100px', // Устанавливает ширину диалогового окна выбора даты
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ alignItems: 'flex-end' }}>
                    <footer style={{
                        position: 'fixed',
                        zIndex: 1000,
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '108px',
                        backgroundColor: 'white',
                        color: '#005475', // Белый цвет текста для контраста
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // padding: '10px 20px', // Отступы внутри футера
                        // boxSizing: 'border-box', // Учитывать внутренние отступы в ширину
                        boxShadow: '0 -1px 1px rgba(0, 0, 0, 0.25)', // Эффект тени
                    }}>
                        <Button variant="contained" onClick={handleAdd} sx={{ height: '48px', weight: '300px', fontFamily: "'Montserrat', sans-serif", fontWeight: '700', fontSize: '18px', backgroundColor: '#005475', lineHeight: '22px' }}>
                            Создать   
                        </Button>

                    </footer>
                </Box>
            </Grid>




        </>
    )
}
export default BookletInfo
