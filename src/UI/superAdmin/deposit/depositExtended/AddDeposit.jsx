import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {memo} from "react"
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
  Grid,
} from "@mui/material";
import exit from "./exit.svg";
import { styled } from "@mui/system";
import { postDeposit } from "../../../../BLL/admin/depositAdminSlice";
// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

const AddDeposit = ({setAddRules}) => {
  const dispatch = useDispatch();
  const [billNumber, setBillNumber] = useState();
  const [spisanie, setSpisanie] = useState();
  const [deposit, setDeposit] = useState();
  const [disabledDeposit, setDisabledDeposit] = useState(false);
  const [disabledSpisanie, setDisabledSpisanie] = useState(false);
  const [open, isOpen] = useState(true)

  const {accountId, organizationCustomerId} = useParams()

  const changeBillNumber = (event) => {
    setBillNumber(event.target.value);
  };
  const changeSpisanie = (event) => {
    setSpisanie(event.target.value);
  };
  const changeDeposit = (event) => {
    setDeposit(event.target.value);
  };

  useEffect(() => {
    if (spisanie == "" || spisanie == null) {
      setDisabledDeposit(false);
    } else {
      setDisabledDeposit(true);
    }

    if (deposit == "" || deposit == null) {
      setDisabledSpisanie(false);
    } else {
      setDisabledSpisanie(true);
    }
  }, [deposit, spisanie]);

  const resetStates = () => {
    setBillNumber("");
    setSpisanie("");
    setDeposit("");
  };

  const handleSave = () => {
    dispatch(
      postDeposit({
        accountId: accountId,
        organizationCustomerId: organizationCustomerId,
        deposit: deposit || null,
        withdraw: spisanie || null,
        billNumber: billNumber,
      })
    ).then(() => {
      setAddRules(false);
    });
  };

  const closeAddDeposit = () => {
    setAddRules(false);
    isOpen(false)

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
              onClick={() => closeAddDeposit()}
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
                  Депозит
                  </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                   <Box>
                   <TextField
                        variant="standard"
                        sx={{
                          width: "100px",
                        }}
                        value={deposit}
                        onChange={changeDeposit}
                        disabled={disabledDeposit}
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
                        disabled={disabledSpisanie}
                      ></TextField>
                   </Box>
                </Grid>
              </Grid>

              <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }}>
                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Счёт №
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
            </Grid>
            {/* <TableContainer
              component={Paper}
              sx={{ marginTop: "40px", width: "600px" }}
            >
              <Table stickyHeader>
                <TableHead>
                    <TextHeader
                      sx={{
                        paddingY: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        background: "#fff",
                      }}
                    >
                      Депозит
                    </TextHeader>
                    <TextHeader
                      sx={{
                        paddingY: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        background: "#fff",
                      }}
                    >
                      Списание
                    </TextHeader>
                    <TextHeader
                      sx={{
                        paddingY: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        background: "#fff",
                      }}
                    >
                      Счёт №
                    </TextHeader>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#333333",
                        textAlign: "center",
                      }}
                    >
                      <TextField
                        variant="standard"
                        sx={{
                          width: "150px",
                        }}
                        value={deposit}
                        onChange={changeDeposit}
                        disabled={disabledDeposit}
                      ></TextField>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#333333",
                        textAlign: "center",
                      }}
                    >
                      <TextField
                        variant="standard"
                        sx={{
                          width: "150px",
                        }}
                        value={spisanie}
                        onChange={changeSpisanie}
                        disabled={disabledSpisanie}
                      ></TextField>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#333333",
                        textAlign: "center",
                      }}
                    >
                      <TextField
                        variant="standard"
                        sx={{
                          width: "150px",
                        }}
                        value={billNumber}
                        onChange={changeBillNumber}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer> */}

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
                Сбросить
              </Button>
            </Box>
          </Box>
        </div>
        </Modal>
    </>
  );
}

export default  AddDeposit;
