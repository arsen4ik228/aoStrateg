import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPriceList,  } from "../../../BLL/admin/priceListSlice";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppBar, Toolbar, Typography, IconButton, Box, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';
import MenuBar from '../Menu/MenuBar';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");


const Records = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accountId } = useParams(); // Извлекаем accountId из URL
    const [date, setDate] = useState(dayjs())

    const pricesInit = useSelector((state) => state.adminPriceList.pricesInit);
    const pricesMain = useSelector((state) => state.adminPriceList.pricesMain);
    const pricesForEmployers = useSelector((state) => state.adminPriceList.pricesForEmployers);

    const [filteredPricesInit, setFilteredPricesInit] = useState([]);
    const [filteredPricesMain, setFilteredPricesMain] = useState([]);
    const [filteredPricesForEmployers, setFilteredPricesForEmployers] = useState([]);

    const [drawerOpen, setDrawerOpen] = useState(false); // Определение состояния drawerOpen и setDrawerOpen

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    useEffect(() => {
        dispatch(getPriceList({ accountId: accountId }));
    }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

    useEffect(() => {
        const selectedDate = new Date(date);
        const filterPrices = (prices) => {
            return prices.filter((price) => {
                const priceDate = new Date(price.activationDate);
                return (
                    selectedDate.getFullYear() > priceDate.getFullYear() ||
                    (selectedDate.getMonth() > priceDate.getMonth() &&
                        selectedDate.getFullYear() >= priceDate.getFullYear()) ||
                    (selectedDate.getDate() >= priceDate.getDate() &&
                        selectedDate.getMonth() >= priceDate.getMonth() &&
                        selectedDate.getFullYear() >= priceDate.getFullYear())
                );
            });
        };

        setFilteredPricesInit(filterPrices(pricesInit));
        setFilteredPricesMain(filterPrices(pricesMain));
        setFilteredPricesForEmployers(filterPrices(pricesForEmployers));
    }, [date]);

    useEffect(() => {
        const selectedDate = new Date(dayjs());
        const filterPrices = (prices) => {
            return prices.filter((price) => {
                const priceDate = new Date(price.activationDate);
                return (
                    selectedDate.getFullYear() > priceDate.getFullYear() ||
                    (selectedDate.getMonth() > priceDate.getMonth() &&
                        selectedDate.getFullYear() >= priceDate.getFullYear()) ||
                    (selectedDate.getDate() >= priceDate.getDate() &&
                        selectedDate.getMonth() >= priceDate.getMonth() &&
                        selectedDate.getFullYear() >= priceDate.getFullYear())
                );
            });
        };

        setFilteredPricesInit(filterPrices(pricesInit));
        setFilteredPricesMain(filterPrices(pricesMain));
        setFilteredPricesForEmployers(filterPrices(pricesForEmployers));
    }, [pricesInit,pricesMain,pricesForEmployers]);

    const disablePastDates = (date) => {
        // Сравниваем дату с текущей датой
        return date.isBefore(dayjs(), "day"); // 'day' здесь означает сравнение по дню, без учета времени
    };
    const clickAdd = () => {
        navigate('AddBooklet')
    };

    return (
        <>

            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontFamily: "'Montserrat', sans-serif", fontWeight: '500' }}>
                        Прайс-листы
                    </Typography>
                    <div style={{ display: 'flex', width: '120px', justifyContent: 'space-between', flexDirection: 'row-reverse' }}> {/* Добавлен контейнер с flex и alignItems */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                format="DD.MM.YYYY"
                                value={date}
                                onChange={setDate}
                                sx={{
                                    width: '105px', // Устанавливает ширину календаря
                                    '& .MuiPickersModal-dialog': {
                                        width: '100px', // Устанавливает ширину диалогового окна выбора даты
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{ width: '10px' }}></div>
                    <IconButton edge="end" aria-label="menu" sx={{ color: '#005475', mr: '1px', fontSize: 'large' }} onClick={clickAdd}>
                        <AddIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="menu" sx={{ color: '#005475' }} onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <MenuBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} /> {/* Передаем toggleDrawer и drawerOpen в MenuBar */}

            <Box sx={{ flexGrow: 1, fontFamily: "'Montserrat', sans-serif" }}>
                <Box sx={{ fontSize: '18px', fontFamily: "'Montserrat', sans-serif", fontWeight: '600', mr: '30px', ml: '30px', mt: '12px', justifyContent: 'flex-start', alignItems: 'center', }}>Начальные</Box>
                <Grid container sx={{ height: '45px', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}>
                    {/* Колонка 1 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>Курс</Box>
                    </Grid>

                    {/* Колонка 3 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>Доступ</Box>

                    </Grid>

                    {/* Колонка 4 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>Доп.</Box>

                    </Grid>
                </Grid>

                {filteredPricesInit?.map((element) =>
                    <Grid container sx={{ height: '45px', fontFamily: "'Montserrat', sans-serif", }}>
                        {/* Колонка 1 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>{element.productAbbreviation}</Box>
                        </Grid>

                        {/* Колонка 3 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.priceAccess}</Box>

                        </Grid>

                        {/* Колонка 4 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.priceBooklet}</Box>

                        </Grid>
                    </Grid>
                )}
            </Box>

            <Box sx={{ flexGrow: 1, fontFamily: "'Montserrat', sans-serif" }}>
                <Box sx={{ fontSize: '18px', fontFamily: "'Montserrat', sans-serif", fontWeight: '600', mr: '30px', ml: '30px', mt: '12px', justifyContent: 'flex-start', alignItems: 'center', }}>Основные</Box>
                <Grid container sx={{ height: '45px', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}>
                    {/* Колонка 1 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>Курс</Box>
                    </Grid>

                    {/* Колонка 3 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>Доступ</Box>

                    </Grid>

                    {/* Колонка 4 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>Доп.</Box>

                    </Grid>
                </Grid>
                {filteredPricesMain?.map((element) =>
                    <Grid container sx={{ height: '45px', fontFamily: "'Montserrat', sans-serif", }}>
                        {/* Колонка 1 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>{element.productAbbreviation}</Box>
                        </Grid>

                        {/* Колонка 3 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.priceAccess}</Box>

                        </Grid>

                        {/* Колонка 4 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.priceBooklet}</Box>

                        </Grid>
                    </Grid>
                )}
            </Box>

            <Box sx={{ flexGrow: 1, fontFamily: "'Montserrat', sans-serif" }}>
                <Box sx={{ fontSize: '18px', fontFamily: "'Montserrat', sans-serif", fontWeight: '600', mr: '30px', ml: '30px', mt: '12px', justifyContent: 'flex-start', alignItems: 'center', }}>Для персонала</Box>
                <Grid container sx={{ height: '45px', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}>
                    {/* Колонка 1 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>Курс</Box>
                    </Grid>

                    {/* Колонка 3 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>Доступ</Box>

                    </Grid>

                    {/* Колонка 4 */}
                    <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>Доп.</Box>

                    </Grid>
                </Grid>
                {filteredPricesForEmployers?.map((element) =>
                    <Grid container sx={{ height: '45px', fontFamily: "'Montserrat', sans-serif", }}>
                        {/* Колонка 1 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }}>{element.productAbbreviation}</Box>
                        </Grid>

                        {/* Колонка 3 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.priceAccess}</Box>

                        </Grid>

                        {/* Колонка 4 */}
                        <Grid container item xs={4} sx={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                            <Box sx={{ fontSize: '16px', fontWeight: '500', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.priceBooklet}</Box>

                        </Grid>
                    </Grid>
                )}
            </Box>
        </>
    )
}
export default Records;