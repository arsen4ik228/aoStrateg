import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
  Modal,
  TextField,
  Grid
} from "@mui/material";
import exit from "../image/exit.svg";
import { styled } from "@mui/system";
import {
  incrementDummyKey,
  postReciever,
} from "../../../../BLL/superAdmin/comissionSlice.js";
// import ErrorHandler from "../../../Custom/ErrorHandler.jsx";
// import CircularProgressCustom from "../../styledComponents/CircularProgress.jsx";
// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function AddReciever({ isOpen, close, commisionRecieverId, setDummyKey }) {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [billNumber, setBillNumber] = useState();
  const [spisanie, setSpisanie] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const errorPostReciever = useSelector(
    (state) => state.superAdminCommision?.errorPostReciever
  );

  const changeBillNumber = (event) => {
    setBillNumber(event.target.value);
  };
  const changeSpisanie = (event) => {
    setSpisanie(event.target.value);
  };
  const resetStates = () => {
    setBillNumber("");
    setSpisanie("");
    setDummyKey(prevState => prevState +1)
  };

  const handleSave = () => {
    setIsLoading(true);
    console.log(billNumber);
    console.log(spisanie);
    dispatch(
      postReciever({
        accountId: accountId,
        commisionRecieverId: commisionRecieverId,
        billNumber: billNumber,
        Spisanie: spisanie,
      })
    ).then(
      () => {
        dispatch(incrementDummyKey());
        resetStates();
        close(false);
        setSnackbarOpen(true);
        setIsLoading(false);
      },
      () => {
        setSnackbarOpen(true);
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      <Modal open={isOpen}>
      <div
        style={{
          display: "grid",
          gridTemplateAreas: '"icon" "box"',
          gridGap: "10px",
          placeItems: "center",
          height: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          paddingTop: "5%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0 0 24px rgba(0, 0, 0, 0.5)",
            padding: "4px",
            borderRadius: "10px",
            gridArea: "box",
            alignSelf: "center",
            position: "relative",
            maxHeight: "calc(100vh - 200px)",
            width: "300px",
            overflow: "visible",
            scrollbarWidth: "thin",
            scrollbarColor: "#005475 #FFFFFF",
          }}
        >
          <IconButton
            onClick={() => {
              close(false);
              resetStates();
            }}
            sx={{
              position: "absolute",
              float: "right",
              top: "-38px",
              right: "-40px",
            }}
          >
            <img src={exit} alt="закрыть" />
          </IconButton>

          <Grid>



            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }}>
              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Cчёт №
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                  <TextField
                    variant="standard"
                    sx={{
                      width: "100px",
                    }}
                    value={billNumber}
                    onChange={changeBillNumber}
                  ></TextField>
                </Box>
              </Grid>
            </Grid>

            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }}>
              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Списание
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                  <TextField
                    variant="standard"
                    sx={{
                      width: "100px",
                    }}
                    value={spisanie}
                    onChange={changeSpisanie}
                  ></TextField>
                </Box>
              </Grid>
            </Grid>

          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Плавное выравнивание кнопок справа
              marginTop: "60px",
              marginRight: "10px",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                textTransform: "none",
                backgroundColor: "#005475",
                color: "#FFFFFF",
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#00435d",
                },
              }}
            >
              Сохранить
            </Button>

            <Button
              onClick={resetStates}
              sx={{
                variant: "contained",
                textTransform: "none",
                backgroundColor: "#CCCCCC",
                color: "#000000",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Montserrat",
                border: 0,
                "&:hover": {
                  backgroundColor: "#8E8E8E",
                  border: 0,
                },
              }}
            >
              Отменить
            </Button>
          </Box>
        </Box>
      </div>



      {/* <ErrorHandler
        error={errorPostReciever}
        snackbarOpen={snackbarOpen}
        close={setSnackbarOpen}
        text={"Счёт создан"}
      ></ErrorHandler> */}
      </Modal>
    </>
  );
}
