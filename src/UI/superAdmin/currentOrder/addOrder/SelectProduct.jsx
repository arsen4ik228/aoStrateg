import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Box,
  Button,
  Grid,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import React from "react";
import exit from "./image/exit.svg";
import { styled } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import CustomStyledCheckbox from "./CustomStyledCheckbox";

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function SelectProduct({
  openModalProduct,
  setOpenModalProduct,
  allProducts,
  selectProducts,
  checkBox,
  exitAddSelectProduct,
  resetAddSelectProduct
}) {
  const [check, setCheck] = useState({});
  const [active, setActive] = useState(false);
  const [activeDeposit, setActiveDeposit] = useState(false);

  useEffect(() => {
    if (exitAddSelectProduct === true) {
      setCheck({});
      resetAddSelectProduct();
    }
  }, [exitAddSelectProduct]);

  useEffect(() => {
    const hasChecked = Object.values(check).some(
      (value) => {
        return (value.checked && (value.type === 1 || value.type === 2 || value.type === 3))
      }
    );
    if (hasChecked) {
      console.log("hasChecked true");
      setActive(false);
      setActiveDeposit(true);
    } else {
      console.log("hasChecked false");
      setActiveDeposit(false);
    }

    const hasDepositChecked = Object.values(check).some(
      (value) => value.checked && value.type === 4
    );
    if (hasDepositChecked) {
      console.log("hasDepositChecked true");
      setActive(true);
      setActiveDeposit(false);
    } else {
      console.log("hasDepositChecked false");
      setActive(false);
    }
  }, [check]);

  useEffect(() => {
    console.log("useEffect");
    if (checkBox === true) {
      const newCheckState = Object.keys(check).reduce((acc, key) => {
        acc[key] = { checked: false, type: check[key].type }; // Преобразование строки в число
        return acc;
      }, {});
      setCheck(newCheckState);
    }
  }, [checkBox])

  const handleChangeCheckbox = (event, id, type) => {
    setCheck((prevState) => ({
      ...prevState,
      [id]: { checked: event.target.checked, type: type },
    }));
  };

  const resetStates = () => {
    selectProducts(0);
    const newCheckState = Object.keys(check).reduce((acc, key) => {
      acc[key] = { checked: false, type: check[key].type }; // Преобразование строки в число
      return acc;
    }, {});
    setCheck(newCheckState);
  };

  const handleSave = () => {
    const checkedProducts = allProducts.filter(
      (product) => !!check[product.id] && check[product.id].checked
    );
    selectProducts(checkedProducts);
    setOpenModalProduct(false);
  };
  console.log(`checkBox ${checkBox}`);

  return (
    <Modal open={openModalProduct}>
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
          width: "80%",
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
            position: "absolute",
            width: "100%",

            overflow: "visible",
          }}
        >
          <IconButton
            onClick={() => setOpenModalProduct(false)}
            sx={{
              position: "absolute",
              float: "right",
              top: "-38px",
              right: "-40px",
            }}
          >
            <img src={exit} alt="закрыть" />
          </IconButton>

          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "60vh",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#005475 #FFFFFF",

              "&::-webkit-scrollbar": {
                width: "10px", // Ширина скроллбара
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "10px", // Радиус скругления трека скроллбара
                backgroundColor: "#f1f1f1", // Цвет трека
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10px", // Радиус скругления области управления
                backgroundColor: "#888", // Цвет области управления
                ":hover": {
                  backgroundColor: "#555", // Цвет при наведении
                },
              },
            }}
          >
            <Table stickyHeader sx={{ display: "flex", flexDirection: "column" }}>
              <div>
                <TableHead>
                  <TableRow>
                    <TextHeader
                      sx={{
                        paddingY: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        background: "#fff",
                      }}
                    >
                      Начальные
                    </TextHeader>
                    <TableBody>
                      {allProducts?.map((item) => {
                        if (item.productTypeId === 1) {
                          return (

                            <TableCell key={check[item.id]?.checked}>
                              <CustomStyledCheckbox
                                checked={check[item.id]?.checked}
                                onChange={(event) =>
                                  handleChangeCheckbox(event, item.id, 1)
                                }
                                disabled={active}
                              ></CustomStyledCheckbox>
                              {item.abbreviation}
                            </TableCell>

                          );
                        }
                      })}
                    </TableBody>
                  </TableRow>
                </TableHead>

              </div>

              <div>
                <TableHead>
                  <TableRow>
                    <TextHeader
                      sx={{
                        paddingY: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        background: "#fff",
                      }}
                    >
                      Основные
                    </TextHeader>
                    <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 2) {
                      return (
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 2)
                              }
                              disabled={active}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                      );
                    }
                  })}
                </TableBody>
                  </TableRow>
                </TableHead>

                
              </div>

              <div>
                <TableHead>
                  <TableRow>
                    <TextHeader
                      sx={{
                        paddingY: 1,
                        position: "sticky",
                        top: 0,
                        zIndex: 100,
                        background: "#fff",
                      }}
                    >
                      Для<span style={{ display: 'block' }}> персонала</span>
                    </TextHeader>
                    <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 3) {
                      return (
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 3)
                              }
                              disabled={active}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                      );
                    }
                  })}
                </TableBody>
                  </TableRow>
                </TableHead>

                
              </div>

              <div>
                <TableHead>
                  <TableRow>
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
                    <TableBody>
                  {allProducts?.map((item) => {
                    if (item.productTypeId === 4) {
                      return (
                          <TableCell key={check[item.id]?.checked}>
                            <CustomStyledCheckbox
                              checked={check[item.id]?.checked}
                              onChange={(event) =>
                                handleChangeCheckbox(event, item.id, 4)
                              }
                              disabled={activeDeposit}
                            ></CustomStyledCheckbox>
                            {item.abbreviation}
                          </TableCell>
                      );
                    }
                  })}
                </TableBody>
                  </TableRow>
                </TableHead>
                
              </div>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Плавное выравнивание кнопок справа
              marginTop: "30px",
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
  );
}
