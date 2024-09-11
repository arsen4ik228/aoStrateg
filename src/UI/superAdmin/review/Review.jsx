import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TextField,
  Tab,
  Tabs,
  Grid
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {
  getCommision,
  getOrganizations,
  getReview,
} from "../../../BLL/superAdmin/reviewSlice"

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";
import Organizations from "./Organizations";
import Commision from "./Commision";
import cursor from "./cursor-click.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";


dayjs.locale("ru");

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

export default function Review() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const reviews = useSelector((state) => state.superAdminReview?.reviews);

  const SUM = useSelector((state) => state.superAdminReview?.SUM);
  const totalQuantity = useSelector(
    (state) => state.superAdminReview?.totalQuantity
  );
  const totalMainQuantity = useSelector(
    (state) => state.superAdminReview?.totalMainQuantity
  );
  const allOrganizations = useSelector(
    (state) => state.superAdminReview?.allOrganizations
  );
  const allCommisionRecievers = useSelector(
    (state) => state.superAdminReview?.allCommisionRecievers
  );

  const [date, setDate] = useState([dayjs().subtract(1, "day"), dayjs()]);
  console.log(date)
  useEffect(() => {
    dispatch(getReview({ accountId: accountId, date: date }));
  }, [dispatch, accountId, date]); // Добавляем accountId в список зависимостей

  const windowSet = () => {
    dispatch();
  };

  const [openStates, setOpenStates] = useState({});
  const [openStatesCommision, setOpenStatesCommision] = useState({});
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const OpenModal = (id) => {
    return setOpenStates({ ...openStates, [id]: true });
  };

  const handleCloseModal = (id) => {
    setOpenStates({ ...openStates, [id]: false });
  };

  const OpenModalCommision = (id) => {
    return setOpenStatesCommision({ ...openStates, [id]: true });
  };

  const handleCloseModalCommision = (id) => {
    setOpenStatesCommision({ ...openStates, [id]: false });
  };

  useEffect(() => {
    let openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      setIsLoadingModal(true);
      dispatch(
        getOrganizations({
          accountId: accountId,
          organizationCustomerId: openModalId,
        })
      ).then(() => {
        setIsLoadingModal(false);
      });
    }
  }, [openStates, dispatch]);

  useEffect(() => {
    let openModalId = Object.keys(openStatesCommision).find(
      (id) => openStatesCommision[id]
    );
    if (openModalId) {
      setIsLoadingModal(true);
      dispatch(
        getCommision({
          accountId: accountId,
          commisionRecieverId: openModalId,
        })
      ).then(() => {
        setIsLoadingModal(false);
      });
    }
  }, [openStatesCommision, dispatch]);

  const [changeTable, setChangeTable] = useState(true)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState(0);
  return (
    <div>
      <Grid sx={{ position: 'fixed', top: 60, left: 0, bottom: 0, right: 0, width: '100%', }}>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
          <Typography
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#005475",
              textAlign: "center",
              marginRight: "30px",
              marginLeft: "30px",
            }}
          >
            Дата:
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Начальная дата"
              value={date[0]}
              onChange={(newValue) => setDate(prev => prev.map(d => d || newValue))}
              inputFormat="DD.MM.YYYY"
              minDate={yesterday}
              maxDate={today}
            />
            <MobileDatePicker
              label="Конечная дата"
              value={date[1]}
              onChange={(newValue) => setDate(prev => prev.map(d => d || newValue))}
              inputFormat="DD.MM.YYYY"
              minDate={yesterday}
              maxDate={today}
            />

          </LocalizationProvider>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            height: "auto",
            width: "100%",
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#005475BF #FFFFFF",
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Table
            stickyHeader
            sx={{ width: "100%", position: "sticky", top: "0" }}
            aria-label="simple table"
          >
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  textAlign: "center",
                }}
              >
                Всего поступлений
              </TableCell>

              <TableCell
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  textAlign: "center",
                }}
              >
                {SUM}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  textAlign: "center",
                }}
              >
                Всего штук
              </TableCell>

              <TableCell
                sx={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "black",
                  textAlign: "center",
                }}
              >
                {totalQuantity}
              </TableCell>
            </TableRow>

            <TableCell
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              Всего основных, шт.
            </TableCell>

            <TableCell
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                color: "black",
                textAlign: "center",
              }}
            >
              {totalMainQuantity}
            </TableCell>
          </Table>

        </TableContainer>

        <Box sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', justifyContent: 'center',mt:1 }}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth" scrollButtons="off" allowScrollButtonsMobile sx={{
            width: '100%',
            maxWidth: '1200px',
            minWidth: '300px',
            margin: '0 auto',
            fontFamily: 'Montserrat, sans-serif',
            borderBottom: '1px solid #808080',
          }}>
            <Tab label="Список всех организаций" onClick={() => setChangeTable(true)} sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }} />
            <Tab label="Список получателей комиссий" onClick={() => setChangeTable(false)} sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }} />
            {/* <Tab label="Для персонала" onClick={() => handleNavigation('personal')} sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }} /> */}
            {/* <Tab label="Депозит" sx={{ minWidth: 'auto', flexGrow: 1, color: '#3A3A3A', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }} /> */}
          </Tabs>
        </Box>
      </Grid>

      <Grid sx={{position: 'fixed', top: 370, left: 0, bottom: 0, right: 0, width: '100%', height:"calc(100vh-370px)", overflow: 'auto'}}>
        {changeTable ? (
          <Table stickyHeader sx={{ width: "100%" }} aria-label="simple table">
            {/* <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#005475",
                  borderBottom: "3px solid #005475",
                  textAlign: "center",
                }}
              >
                Список всех организаций
              </TableCell>
            </TableRow>
          </TableHead> */}
            <TableBody>
              {allOrganizations?.map((item) => (
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStates[item.id] ? "#0031B01A" : "",
                      transition: "color 0.5s ease",
                    }}
                    onClick={() => {
                      navigate(item.id);
                    }}
                  >
                    {openStates[item.id] ? (
                      <img
                        src={cursor}
                        alt="курсор"
                        style={{ float: "left" }}
                      ></img>
                    ) : null}
                    {item.organizationName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (

          <Table stickyHeader sx={{ width: "100%" }} aria-label="simple table">
            {/* <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#005475",
                  borderBottom: "3px solid #005475",
                  textAlign: "center",
                }}
              >
                Список получателей комиссий
              </TableCell>
            </TableRow>
          </TableHead> */}
            <TableBody>
              {allCommisionRecievers?.map((item) => (
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: openStatesCommision[item.id] ? "#0031B01A" : "",
                      transition: "color 0.5s ease",
                    }}
                    onClick={() => {
                      OpenModalCommision(item.id);
                    }}
                  >
                    {openStatesCommision[item.id] ? (
                      <img
                        src={cursor}
                        alt="курсор"
                        style={{ float: "left" }}
                      ></img>
                    ) : null}
                    {item.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
      {/* 
      <Organizations
        openStates={openStates}
        close={handleCloseModal}
      ></Organizations>
*/}
      <Commision
        openStates={openStatesCommision}
        close={handleCloseModalCommision}
      ></Commision> 
    </div>
  );
}
