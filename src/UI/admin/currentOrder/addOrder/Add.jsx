import React from "react";
import {
  Table,
  TableBody,
  Box,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import CustomStyledCheckbox from "./CustomStyledCheckbox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import plus from "./image/plus.svg";
import { getOrder, putNewOrder } from "../../../../BLL/admin/orderSlice"
import SelectProduct from "./SelectProduct";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgressCustom from "./CircularProgress";
import ErrorHandler from "./ErrorHandler";

// Text Header
const TextHeader = styled(Box)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});

const TypographyStyle = styled(Typography)({
  color: "#333333",
  fontFamily: "'Montserrat'",
  fontSize: "16px",
  fontWeight: 700,
  float: "right",
  marginTop: "15px",
  marginRight: "15px",
  marginBottom: "15px",
});

export default function Add({
  isOpen,
  setIsOpen,
  allProducts,
  allOrganizations,
  allPayees,
}) {
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const [openModalAddProduct, setOpenModalAddProduct] = useState(false);

  // Таблиц выбор  Академиии
  const [selectOrganizationName, setSelectOrganizationName] = useState("");
  const [selectPayee, setSelectPayee] = useState("");
  const [inputAccountNumber, setInputAccountNumber] = useState("");
  const [checkDeposit, setCheckDeposit] = useState(false);
  const [selectStatus, setSelectStatus] = useState();

  const [products, setProducts] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  const [isFieldCleared, setIsFieldCleared] = useState({});
  // Таблиц с добавлением продуктов
  const [productInputQuantity, setProductInputQuantity] = useState({});
  const [selectProductAccessType, setSelectProductAccessType] = useState({});
  const [selectProductGeneration, setSelectProductGeneration] = useState({});
  const [checkProductBooklet, setcheckProductBooklet] = useState({});
  const [sumForOneProduct, setSumForOneProduct] = useState({});

  const [exitAddSelectProduct, setExitAddSelectProduct] = useState(false);
  const [isLoadingModalSave, setIsLoadingModalSave] = useState(false);

  const errorPutNewOrder = useSelector((state) => state.adminOrder.errorPutNewOrder);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpenEmpty, setSnackbarOpenEmpty] = useState(false);

  const allIds = Array.isArray(products) && products.map((row) => row.id);
  const totalSum =
    Array.isArray(products) &&
    allIds.reduce((acc, id) => acc + (sumForOneProduct[id] || 0), 0);

    const navigate = useNavigate();
  useEffect(() => {
    // Инициализация sumForOneTitle
    const initialSumForOneTitle =
      Array.isArray(products) &&
      products.reduce((acc, row) => {
        const price = checkProductBooklet[row.id]
          ? row.priceBooklet
          : row.priceAccess;
        acc[row.id] = (productInputQuantity[row.id] || 1) * price;
        console.log(price);
        console.log(acc[row.id]);
        console.log(acc[row.id]);
        return acc;
      }, {});

    setSumForOneProduct(initialSumForOneTitle);
  }, [products, checkProductBooklet, productInputQuantity]);

  // Таблиц выбор  Академиии
  const handleChangeInputAccountNumber = (event) => {
    setInputAccountNumber(
      event.target.value // Обновляем выбранное значение для данного элемента
    );
  };

  const handleChangeCheckboxDeposit = (event) => {
    setCheckDeposit(event.target.checked);
  };

  const handleChangeSelectOrganization = (event) => {
    setSelectOrganizationName(event.target.value);
  };
  const handleChangeSelectPayee = (event) => {
    setSelectPayee(event.target.value);
  };

  // Таблиц с добавлением продуктов
  const handleChangeAccessType = (event, id) => {
    setSelectProductAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const handleChangeGeneration = (event, id) => {
    setSelectProductGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const handleChangeCheckboxBooklet = (event, id) => {
    setcheckProductBooklet((prevState) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };

  const handleChangeInputQuantity = (event, id) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") {
      setProductInputQuantity((prevState) => ({
        ...prevState,
        [id]: undefined,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setProductInputQuantity((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const handleSave = () => {
    setIsLoadingModalSave(true);
    setCheckBox(true);
    const titlesToCreate = [];
    if (products[0]?.productTypeId === 4) {
      products.forEach((item) => {
        titlesToCreate.push({
          productId: item.id,
          generation: null,
          accessType: null,
          quantity: productInputQuantity[item.id],
          addBooklet: false,
        });
      });
    } else {
      products.forEach((item) => {
        titlesToCreate.push({
          productId: item.id,
          generation: selectProductGeneration[item.id] || "Второе поколение",
          accessType: checkProductBooklet[item.id]
            ? null
            : selectProductAccessType[item.id] || "Электронный",
          quantity: productInputQuantity[item.id] || 1,
          addBooklet: checkProductBooklet[item.id] || false,
        });
      });
    }

    if (titlesToCreate.length > 0) {
      dispatch(
        putNewOrder({
          accountId: accountId,
          organizationCustomerId: selectOrganizationName,
          status: selectStatus || "Активный",
          billNumber: inputAccountNumber,
          payeeId: selectPayee,
          isFromDeposit: checkDeposit,
          titlesToCreate: titlesToCreate,
        })
      ).then(() => {
        dispatch(getOrder(accountId));
        resetStates();
        setIsLoadingModalSave(false);
        navigate(-1);
      }, () => { setIsLoadingModalSave(false); });
    } else {
      setIsLoadingModalSave(false);
      setSnackbarOpenEmpty(true);
    }
  };

  const handleChangeOpenModalProduct = () => {
    setOpenModalAddProduct(true);
  };

  const handleChangeModalProduct = (selectProducts) => {
    setProducts(selectProducts);
  };

  const handleChangeSelectStatus = (event) => {
    setSelectStatus(event.target.value);
  };

  const resetStates = () => {
    setProducts([]);
    setSelectStatus();
    setCheckDeposit();
    setInputAccountNumber();
    setSelectOrganizationName();
    setSelectPayee();
    setExitAddSelectProduct(true);
  };

  const resetAddSelectProduct = () => {
    setExitAddSelectProduct(false);
  };
  const handleChangeCloseModalProduct = () => {
    setCheckBox(true);
    setIsOpen(false);
    resetStates();
  };
  return (
    <>
      {isLoadingModalSave ? (
        <Modal open={true}>
          <CircularProgressCustom></CircularProgressCustom>
        </Modal>
      ) : (
        // <Modal open={isOpen}>
        // <div
        //   style={{
        //     display: "grid",
        //     gridTemplateAreas: '"icon" "box"',
        //     gridGap: "10px",
        //     placeItems: "center",
        //     height: "auto",
        //     position: "absolute",
        //     top: "45%",
        //     left: "55%",
        //     transform: "translate(-50%, -50%)",
        //     width: "100%",
        //     paddingTop: "5%",
        //   }}
        // >
        <>
          {/* <Box
              sx={{
                backgroundColor: "white",
                boxShadow: "0 0 24px rgba(0, 0, 0, 0.5)",
                padding: "4px",
                borderRadius: "10px",
                gridArea: "box",
                alignSelf: "center",
                position: "absolute",
                width: "auto",
                overflow: "visible",
              }}
            > */}
          <IconButton
            onClick={() => handleChangeCloseModalProduct()}
            sx={{
              position: "absolute",
              float: "right",
              top: "-38px",
              right: "-40px",
            }}
          >
          </IconButton>

          <Grid sx={{ position: 'fixed', top: 55, left: 0, bottom: 0, right: 0, width: '100%', height: '250px', zIndex: 1000 }}>

            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Академия
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      color: "black",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={selectOrganizationName}
                    onChange={(event) =>
                      handleChangeSelectOrganization(event)
                    }
                  >
                    {allOrganizations.map((item) => {
                      return (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            color: "#999999",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          {item.organizationName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid>
            </Grid>

            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Получатель
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      color: "black",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={selectPayee}
                    onChange={(event) => handleChangeSelectPayee(event)}
                  >
                    {allPayees.map((item) => {
                      return (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            color: "#999999",
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
              </Grid>
            </Grid>


            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  Состояние
                </Box>

              </Grid>
              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box sx={{ textAlign: "center" }}>
                  <Select
                    variant="standard"
                    sx={{
                      fontFamily: "Montserrat",
                      fontSize: "16px",
                      color: "black",
                      textAlign: "center",
                      cursor: "pointer",
                      width: "150px",
                    }}
                    value={selectStatus || "Активный"}
                    onChange={(event) => handleChangeSelectStatus(event)}
                  >
                    <MenuItem
                      value="Активный"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        color: "#999999",
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
                        color: "#999999",
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
                        color: "#999999",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Оплачен
                    </MenuItem>

                    <MenuItem
                      value="Отменен"
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",
                        color: "#999999",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      Отменен
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>

            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  № Счёта
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box>
                  <TextField
                    variant="standard"
                    sx={{
                      width: "80px",
                    }}
                    value={inputAccountNumber || ""}
                    onChange={(event) =>
                      handleChangeInputAccountNumber(event)
                    }
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                  С Депозита
                </Box>
              </Grid>

              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Box
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "16px",

                    color: "black",
                    textAlign: "center",
                  }}
                >
                  <CustomStyledCheckbox
                    checked={checkDeposit}
                    onChange={(event) =>
                      handleChangeCheckboxDeposit(event)
                    }
                  ></CustomStyledCheckbox>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {products[0]?.productTypeId === 4 ? (
            
                  <>
                  <IconButton onClick={handleChangeOpenModalProduct}>
                    <img src={plus} alt="плюс" />
                  </IconButton>
                  <Grid sx={{ width: '100%', zIndex: 1,overflow: 'auto', mt:'345px', height:'calc(100vh - 400px)', position:'fixed', overflow: 'auto'}}>
                  {Array.isArray(products) &&
                    products.map((product) => (
                      <Box key={product.id}>
                        <Box
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            textAlign: "center",
                            width: "70px",
                          }}
                        >
                          {product.name.split("&quot;").join('"')}
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                          <TextField
                            variant="standard"
                            sx={{
                              width: "80px",
                              textAlign: "center",
                            }}
                            type="number"
                            value={
                              productInputQuantity[product.id] ||
                              (isFieldCleared[product.id] ? "" : "")
                            }
                            onChange={(event) =>
                              handleChangeInputQuantity(
                                event,
                                product.id,
                                product
                              )
                            }
                          />
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                          {checkProductBooklet[product.id]
                            ? product.priceBooklet
                            : product.priceAccess}
                          &#x20bd;
                        </Box>

                        <Box
                          sx={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",

                            color: "black",
                            textAlign: "center",
                          }}
                        >
                          {sumForOneProduct[product.id]} &#x20bd;
                        </Box>
                      </Box>
                    ))}
                </Grid>
            
            </>
          ) : (
            // <TableContainer
            //   component={Paper}
            //   sx={{
            //     marginTop: "50px",
            //     maxHeight: "calc(100vh - 350px)",
            //     overflow: "auto",
            //     scrollbarWidth: "thin",
            //     scrollbarColor: "#005475 #FFFFFF",
            //   }}
            // >
            // <Table stickyHeader>
            // <TableHead>
            <>
              <Box sx={{ weight: '100%', borderBottom: '2px solid #005475', zIndex: 100, height:'40px' ,position:'fixed',top:'0',bottom:'0',left:'0',right:'0',mt:'305px'}}>
                <IconButton onClick={handleChangeOpenModalProduct}>
                  <img src={plus} alt="плюс" />
                </IconButton>
                {/* </TableHead> */}
              </Box>

              <Grid sx={{ width: '100%', zIndex: 1,overflow: 'auto', mt:'345px', height:'calc(100vh - 400px)', position:'fixed', overflow: 'auto'}}>

                {Array.isArray(products) &&
                  products.map((product) => (
                    <Box key={product.id}>
                        <Grid container sx={{ justifyContent: 'center', alignItems: 'center', justifyContent:'center',borderBottom: '1px solid #B4B4B4', }} >
                          <Box
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "18px",
                              fontWeight:'600',
                              color: "black",
                              textAlign: "center",
                              width: "100%",
                              mt:1,
                              mb:1,
                            }}
                          >
                            {product.name.split("&quot;").join('"')}
                          </Box>
                        </Grid>

                        <Grid container sx={{ height: '50px', color: 'black',fontFamily: "'Montserrat', sans-serif" }} >
                          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                              Доступ
                            </Box>
                          </Grid>

                          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                            <Box>
                              <Select
                                variant="standard"
                                value={
                                  checkProductBooklet[product.id]
                                    ? null
                                    : selectProductAccessType[product.id] ||
                                    "Электронный"
                                }
                                disabled={
                                  checkProductBooklet[product.id] || false
                                } // Добавляем условие для отключения
                                onChange={(event) =>
                                  handleChangeAccessType(
                                    event,
                                    product.id,
                                    product
                                  )
                                }
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "16px",

                                  color: "black",
                                  textAlign: "center",
                                  cursor: "pointer",
                                  width: "150px",
                                }}
                              >
                                <MenuItem
                                  value="Бумажный"
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",

                                    color: "#999999",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  Бумажный
                                </MenuItem>
                                <MenuItem
                                  value="Электронный"
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",

                                    color: "#999999",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  Электронный
                                </MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                        </Grid>


                      <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                        <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                          <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Поколение
                          </Box>
                        </Grid>

                        <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                          <Box>
                            <Select
                              variant="standard"
                              value={
                                selectProductGeneration[product.id] ||
                                "Второе поколение"
                              }
                              onChange={(event) =>
                                handleChangeGeneration(event, product.id)
                              }
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",

                                color: "black",
                                textAlign: "center",
                                cursor: "pointer",
                                width: "150px",
                              }}
                            >
                              <MenuItem
                                value="Первое поколение"
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "16px",

                                  color: "#999999",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                Первое поколение
                              </MenuItem>
                              <MenuItem
                                value="Второе поколение"
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "16px",

                                  color: "#999999",
                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                Второе поколение
                              </MenuItem>
                            </Select>
                          </Box>
                          </Grid>
                          </Grid>


                          <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                              Доп.буклет
                            </Box>
                          </Grid>

                          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                          <Box
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",

                              color: "black",
                              textAlign: "center",
                            }}
                          >
                            <CustomStyledCheckbox
                              checked={checkProductBooklet[product.id]}
                              onChange={(event) =>
                                handleChangeCheckboxBooklet(event, product.id)
                              }
                            ></CustomStyledCheckbox>
                          </Box>
                          </Grid>
                              </Grid>

                              <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                              Количество
                            </Box>
                          </Grid>

                          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                          <Box>
                            <TextField
                              variant="standard"
                              sx={{
                                width: "80px",
                              }}
                              type="number"
                              value={
                                productInputQuantity[product.id] ||
                                (isFieldCleared[product.id] ? "" : 1)
                              }
                              onChange={(event) =>
                                handleChangeInputQuantity(
                                  event,
                                  product.id,
                                  product
                                )
                              }
                            />
                          </Box>

                          </Grid>
                            </Grid>

                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif", borderBottom: '1px solid #B4B4B4' }} >
                          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                              Цена
                            </Box>
                          </Grid>

                          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                          <Box sx={{fontFamily: "Montserrat",}}>
                            {checkProductBooklet[product.id]
                              ? product.priceBooklet
                              : product.priceAccess}
                            &#x20bd;
                          </Box>
                              </Grid>
                              </Grid>
                          {/* <Box
                            sx={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",

                              color: "black",
                              textAlign: "center",
                            }}
                          >
                            {sumForOneProduct[product.id]} &#x20bd;
                          </Box> */}


                        </Box>
                  ))}
                      </Grid>
                    </>
                    // {/* </Table> */}
                    // </TableContainer>
                  )}

                <TypographyStyle>Итого: {totalSum} &#x20bd;</TypographyStyle>
              <Box
                sx={{
                  
                  position: 'fixed',
                  zIndex: 1000,
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '50px',
                  backgroundColor: 'white',
                  color: '#005475', // Белый цвет текста для контраста
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // padding: '10px 20px', // Отступы внутри футера
                  // boxSizing: 'border-box', // Учитывать внутренние отступы в ширину
                  boxShadow: '0 -1px 1px rgba(0, 0, 0, 0.25)',

                }}
              >
                <TypographyStyle>Итого: {totalSum} &#x20bd;</TypographyStyle>
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
                    ml:3,
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

                {/* </Box> */}
              </>
        // </div>
        // </Modal>
      )}
      <ErrorHandler
        error={errorPutNewOrder}
        snackbarOpen={snackbarOpen}
        close={setSnackbarOpen}
        text={"Заказ создан"}
      ></ErrorHandler>

      <ErrorHandler
        error={"Заказ пустой"}
        snackbarOpen={snackbarOpenEmpty}
        close={setSnackbarOpenEmpty}
        text={"Заказ пустой"}
      ></ErrorHandler>

      <SelectProduct
        openModalProduct={openModalAddProduct}
        setOpenModalProduct={setOpenModalAddProduct}
        allProducts={allProducts}
        selectProducts={handleChangeModalProduct}
        checkBox={checkBox}
        exitAddSelectProduct={exitAddSelectProduct}
        resetAddSelectProduct={resetAddSelectProduct}
      ></SelectProduct>
    </>
  );
}
