import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  Box,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  IconButton,
  MenuItem,
  Modal,
  Grid,
  Select,
} from "@mui/material";
import { styled } from "@mui/system";
import exit from "./exit.svg";
import { getOrganizations } from "../../../BLL/superAdmin/reviewSlice";
import Header from "./Header";

const TextHeader = styled(Box)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

export default function Organizations() {
  const [data, setData] = useState(0);
  const [status, setStatus] = useState("Активный");
  const [payee, setPayee] = useState();
  const [products, setProducts] = useState();
  const [groupProducts, setGroupProducts] = useState();
  const [display, setDisplay] = useState();
  const [result, setResult] = useState(0);
  const [disabledGroupProducts, setDisabledGroupProducts] = useState(false);
  const [disabledProducts, setDisabledProducts] = useState(false);

  const { accountId, organizationCustomerId } = useParams()
  const dispatch = useDispatch()



  const allOrders = useSelector((state) => state.superAdminReview?.allOrders);
  const allProducts = useSelector(
    (state) => state.superAdminReview?.allProducts
  );
  const allPayees = useSelector((state) => state.superAdminReview?.allPayees);

  const nameOrganization = useSelector(
    (state) => state.superAdminReview?.nameOrganization
  );

  const id = useSelector((state) => state.superAdminReview?.id);
  const onChangeData = (e) => {
    setData(e.target.value);
  };

  const handleChangeSelectStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeSelectPayee = (event) => {
    setPayee(event.target.value);
  };

  const handleChangeSelectDisplay = (event) => {
    setDisplay(event.target.value);
  };

  const handleChangeSelectProducts = (event) => {
    setProducts(event.target.value);
  };

  const handleChangeSelectGroupProducts = (event) => {
    setGroupProducts(event.target.value);
  };

  const SUMOrder = () => {
    let sum = 0;
    allOrders?.map((item) => {
      if (item.orderStatus === status) {
        if (item.order.payeeId === payee) {
          sum += Number(item.SUM);
        }
      }
    });
    setResult(sum);
  };

  const totalQuantityOrder = () => {
    let totalQuantity = 0;
    allOrders?.map((item) => {
      if (item.orderStatus === status) {
        if (item.order.payeeId === payee) {
          totalQuantity += Number(item.totalQuantity);
        }
      }
    });
    setResult(totalQuantity);
  };

  const SUMProduct = () => {
    let sum = 0;
    allProducts?.map((item) => {
      if (groupProducts === "null") {
        if (item.id === products && item.titles[0]?.Order?.payeeId === payee) {
          sum += Number(item.SUM);
        }
      } else {
        if (
          item.productTypeId === groupProducts &&
          item.titles[0]?.Order?.payeeId === payee
        ) {
          sum += Number(item.SUM);
        }
      }
    });
    setResult(sum);
  };

  const totalQuantityProduct = () => {
    let totalQuantity = 0;
    allProducts?.map((item) => {
      if (groupProducts === "null") {
        if (item.id === products && item.titles[0]?.Order?.payeeId === payee) {
          totalQuantity += Number(item.totalQuantity);
        }
      } else {
        if (
          item.productTypeId === groupProducts &&
          item.titles[0]?.Order?.payeeId === payee
        ) {
          totalQuantity += Number(item.totalQuantity);
        }
      }
    });
    setResult(totalQuantity);
  };

  useEffect(() => {
    if (groupProducts === undefined) {
      setDisabledProducts(false);
    } else {
      if (groupProducts === "null") {
        setDisabledProducts(false);
      } else {
        setDisabledProducts(true);
      }
    }
  }, [groupProducts]);

  useEffect(() => {
    if (products === undefined) {
      setDisabledGroupProducts(false);
    } else {
      if (products === "null") {
        setDisabledGroupProducts(false);
      } else {
        setDisabledGroupProducts(true);
      }
    }
  }, [products]);

  useEffect(() => {
    setResult(0);
    if (data === 0) {
      if (display === "Сумма") {
        SUMOrder();
      } else {
        totalQuantityOrder();
      }
    } else {
      if (display === "Сумма") {
        SUMProduct();
      } else {
        totalQuantityProduct();
      }
    }
  }, [status, payee, products, groupProducts, display, data]);


  const resetState = () => {
    setData(0);
    setPayee();
    setProducts();
    setGroupProducts();
    setResult();
    setDisabledGroupProducts(false);
    setDisabledProducts(false);
    setDisplay();
  }

  useEffect(() => {

    dispatch(
      getOrganizations({
        accountId: accountId,
        organizationCustomerId: organizationCustomerId,
      })
    )
  }, [accountId, organizationCustomerId, dispatch]);

  return (
    <>
    <Header></Header>
      <Grid sx={{ position: 'fixed', top: 55, left: 0, bottom: 0, right: 0, width: '100%', zIndex: 1000 }}>


        <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
              Данные о:
            </Box>
          </Grid>

          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>

              <Select
                variant="standard"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "150px",
                }}
                value={data}
                onChange={(e) => {
                  onChangeData(e);
                }}
              >
                <MenuItem
                  value={0}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    color: "#999999",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Заказы
                </MenuItem>
                <MenuItem
                  value={1}
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",
                    color: "#999999",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Товары
                </MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>

        {data === 0 ? (
          <>


            <>
              <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                    Академия
                  </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>

                    {nameOrganization}
                  </Box>
                </Grid>
              </Grid>

              <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                    Статус
                  </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>

                    <Select
                      variant="standard"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                      value={status}
                      onChange={(event) => handleChangeSelectStatus(event)}
                    >
                      <MenuItem
                        value="Активный"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Активный
                      </MenuItem>
                      <MenuItem
                        value="Выставлен счёт"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Выставлен счёт
                      </MenuItem>
                      <MenuItem
                        value="Оплачен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Оплачен
                      </MenuItem>
                      <MenuItem
                        value="Отправлен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Отправлен
                      </MenuItem>
                      <MenuItem
                        value="Получен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Получен
                      </MenuItem>
                      <MenuItem
                        value="Отменен"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        Отменен
                      </MenuItem>
                    </Select>
                  </Box>
                </Grid></Grid>

              <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                    Получатель
                  </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>

                    <Select
                      variant="standard"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                      value={payee}
                      onChange={(event) => handleChangeSelectPayee(event)}
                    >
                      {allPayees?.map((item) => {
                        return (
                          <MenuItem
                            value={item.id}
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </Grid></Grid>

              <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                    Отобразить
                  </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>

                    <Select
                      variant="standard"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                        width: "150px",
                      }}
                      value={display}
                      onChange={(event) => handleChangeSelectDisplay(event)}
                    >
                      <MenuItem
                        value="Сумма"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => SUMOrder()}
                      >
                        Сумма
                      </MenuItem>

                      <MenuItem
                        value="Количество"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => totalQuantityOrder()}
                      >
                        Количество
                      </MenuItem>
                    </Select>
                  </Box>
                </Grid></Grid>

              <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '18px', fontWeight: '600', ml: '25px', color: 'black' }}>
                    Результат
                  </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                  <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px', fontWeight: '600' }}>

                    {result}
                  </Box>
                </Grid></Grid>
            </>
          </>
        ) : (
          <>
        

            <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Академия
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  {nameOrganization}
                </Box>
              </Grid></Grid>

            <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Получатель
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={payee}
                    onChange={(event) => handleChangeSelectPayee(event)}
                  >
                    {allPayees?.map((item) => {
                      return (
                        <MenuItem
                          value={item.id}
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid></Grid>

            <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Группа товаров
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={groupProducts}
                    onChange={(event) =>
                      handleChangeSelectGroupProducts(event)
                    }
                    disabled={disabledGroupProducts}
                  >
                    <MenuItem
                      value={"null"}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      —
                    </MenuItem>

                    <MenuItem
                      value={1}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Начальные
                    </MenuItem>

                    <MenuItem
                      value={2}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Основные
                    </MenuItem>
                    <MenuItem
                      value={3}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Для персонала
                    </MenuItem>
                  </Select>
                </Box>
              </Grid></Grid>

            <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Товары
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={products}
                    onChange={(event) => handleChangeSelectProducts(event)}
                    disabled={disabledProducts}
                  >
                    <MenuItem
                      value={"null"}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      —
                    </MenuItem>

                    {allProducts?.map((item) => {
                      return (
                        <MenuItem
                          value={item.id}
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          {item.abbreviation}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid></Grid>

            <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Отобразить
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={display}
                    onChange={(event) => handleChangeSelectDisplay(event)}
                  >
                    <MenuItem
                      value="Сумма"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => SUMProduct()}
                    >
                      Сумма
                    </MenuItem>

                    <MenuItem
                      value="Количество"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => totalQuantityProduct()}
                    >
                      Количество
                    </MenuItem>
                  </Select>
                </Box>
              </Grid></Grid>

            <Grid container sx={{ height: '75px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '600', ml: '25px', color: 'black' }}>
                  Результат
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px', fontWeight: '600' }}>

                  {result}
                </Box>
              </Grid></Grid>
          </>
        )}


      </Grid>
    </>
  );
}
