import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useState, useRef } from "react";
import exit from "../../addOrder/image/exit.svg";
// import cursor from "../addOrder/image/cursor-click.svg";
// import deleteBlue from "./image/deleteBlue.svg";
import deleteGrey from "../../addOrder/image/deleteGrey.svg";
import check from "../../addOrder/image/check.svg";
import checkbox from "../../addOrder/image/checkbox.svg";
import plus from "../../addOrder/image/plus.svg";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Add from "../addOrder/Add.jsx";
import CustomStyledCheckbox from "../../addOrder/CustomStyledCheckbox.jsx";
import { styled } from "@mui/system";
import {
  getNewOrder,
  getOrder,
  getOrderModal,
  updateTitleOrderAdmin,
  deleteTitleOrder,
} from "../../../../../BLL/admin/orderSlice.js";

// import FloatingScrollToTopButton from "../../styledComponents/FloatingScrollToTopButton.jsx";
import CircularProgressCustom from "../../addOrder/CircularProgress.jsx"
import AddSelectProduct from "../AddSelectProduct.jsx";
// import AddTitlesOrders from "./AddTitlesOrders.jsx";
import ErrorHandler from "../../addOrder/ErrorHandler.jsx";

export default function Orders() {
  const dispatch = useDispatch();
  const { accountId, id } = useParams();
  const [openStates, setOpenStates] = useState({});
  const [selectedAbbr, setSelectedAbbr] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [selectedInput, setSelectedInput] = useState({});
  const [isFieldCleared, setIsFieldCleared] = useState({});
  const [sumForOneTitle, setSumForOneTitle] = useState({});
  const [selectedCheck, setSelectedCheck] = useState({});
  const [selectedAccessType, setSelectedAccessType] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productId, setProductId] = useState({});
  const [isDeleteClicked, setIsDeleteClicked] = useState(false); // при удалении товара в модальном окне заново вызывался getOrderModal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [selectOrganization, setSelectOrganization] = useState({});
  const [selectStatus, setSelectStatus] = useState({});
  const [payeeName, setPayeeName] = useState({});
  const [inputAccountNumber, setInputAccountNumber] = useState({});
  const [isInputCleared, setIsInputCleared] = useState();
  const [selectedCheckDeposit, setSelectedCheckDeposit] = useState();
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isLoadingModalSave, setIsLoadingModalSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpenDelete, setSnackbarOpenDelete] = useState(false);

  let disabledAbbreviation = [];
  // AddTitlesOrders.jsx
  const [checkProductBooklet, setcheckProductBooklet] = useState({});
  const [selectProductGeneration, setSelectProductGeneration] = useState({});
  const [selectProductAccessType, setSelectProductAccessType] = useState({});
  const [productInputQuantity, setProductInputQuantity] = useState({});
  const [isFieldClearedProduct, setIsFieldClearedProduct] = useState({});
  const [sumForOneProduct, setSumForOneProduct] = useState({});

  const [exitAddSelectProduct, setExitAddSelectProduct] = useState(false);
  const [deleteTitles, setDeleteTitles] = useState(false);

  const [products, setProducts] = useState([]);
  const handleChangeModalProduct = (selectProducts) => {
    setProducts(selectProducts);
  };
  const allIdsProduct =
    Array.isArray(products) && products.map((row) => row.id);
  const totalSumProduct =
    Array.isArray(products) &&
    allIdsProduct.reduce((acc, id) => acc + (sumForOneProduct[id] || 0), 0);

  useEffect(() => {
    // Инициализация sumForOneTitle
    const initialSumForOneTitle =
      Array.isArray(products) &&
      products.reduce((acc, row) => {
        const price = checkProductBooklet[row.id]
          ? row.priceBooklet
          : row.priceAccess;
        acc[row.id] = (productInputQuantity[row.id] || 1) * price;
        return acc;
      }, {});

    setSumForOneProduct(initialSumForOneTitle);
  }, [products, checkProductBooklet, productInputQuantity]);

  const handleChangeAccessTypeProduct = (event, id) => {
    setSelectProductAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };
  const handleChangeGenerationProduct = (event, id) => {
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
      setIsFieldClearedProduct((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setProductInputQuantity((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
      setIsFieldClearedProduct((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const deleteTitlesNew = (idToDelete) => {
    setProducts(products.filter((product) => product.id !== idToDelete));
    setDeleteTitles(true);
  };
  const stateDeleteTitles = () => {
    setDeleteTitles(false);
  };

  const orders = useSelector((state) => state.adminOrder.orders);
  const errorUpdateTitleOrderAdmin = useSelector(
    (state) => state.adminOrder.errorUpdateTitleOrderAdmin
  );
  const ListProductsModal = useSelector((state) => state.adminOrder?.products);
  const listModalTitles = useSelector((state) => state.adminOrder?.modalTitles);
  const ObjectModalOrder = useSelector((state) => state.adminOrder?.modalOrder);
  const listModalPayees = useSelector((state) => state.adminOrder?.payees);
  const errorDeleteTitleOrder = useSelector(
    (state) => state.adminOrder?.errorDeleteTitleOrder
  );
  const allOrganizationsModal = useSelector(
    (state) => state.adminOrder?.allOrganizationsModal
  );

  const allProducts = useSelector((state) => state.adminOrder?.allProducts);
  const allOrganizations = useSelector(
    (state) => state.adminOrder?.allOrganizations
  );
  const allPayees = useSelector((state) => state.adminOrder?.allPayees);

  const allIds = listModalTitles.map((row) => row.id);
  const totalSum = allIds.reduce(
    (acc, id) => acc + (sumForOneTitle[id] || 0),
    0
  );

  const sortAllProducts = [...allProducts].sort((a, b) => {
    if (a.abbreviation > b.abbreviation) {
      return 1;
    } else if (a.abbreviation < b.abbreviation) {
      return -1;
    }
    return 0;
  });

  const [sortedOrders, setSortedOrders] = useState([...orders]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getOrder(accountId)).then(() => setIsLoading(false));
  }, [accountId, dispatch]);

  useEffect(() => {
    setSortedOrders([...orders]);
  }, [orders]);

  useEffect(() => {
    // Find the first open modal
    const openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(
        getOrderModal({ accountId: accountId, orderId: openModalId })
      ).then(
        () => {
          setIsLoadingModal(false);
        },
        () => {
          setIsLoadingModal(false);
        }
      );
      setIsDeleteClicked(false);
    }
  }, [isDeleteClicked, openStates, dispatch]);

  useEffect(() => {
    if (listModalTitles) {
      const initialSelectedInput = listModalTitles.reduce((acc, item) => {
        acc[item.id] = item.quantity; // Предполагаем, что у вас есть начальное количество
        return acc;
      }, {});

      setSelectedInput(initialSelectedInput);
    }
  }, [listModalTitles]); // Зависимость от listModalTitles

  useEffect(() => {
    // Принудительное обновление состояния чекбокса
    listModalTitles.forEach((row) => {
      // Проверяем, есть ли уже значение в selectedCheck для данного id
      if (
        selectedCheck[row.id] === undefined ||
        selectedCheck[row.id] === null
      ) {
        // Если нет, проверяем, равно ли значение в row.addBooklet true
        if (row.addBooklet === true) {
          // Если да, устанавливаем selectedCheck[row.id] в true
          setSelectedCheck((prevState) => ({
            ...prevState,
            [row.id]: true, // Используйте true для отмеченных чекбоксов
          }));
        } else {
          // Если row.addBooklet не равно true, устанавливаем selectedCheck[row.id] в false
          setSelectedCheck((prevState) => ({
            ...prevState,
            [row.id]: false, // Используйте false для неотмеченных чекбоксов
          }));
        }
      }
    });
  }, [selectedCheck, listModalTitles]); // Зависимости хука

  useEffect(() => {
    // Обновляем ошибки для каждого элемента
    const newErrors = {};
    listModalTitles.forEach((row) => {
      const isChecked = selectedCheck[row.id];
      // const isChecked = selectedCheck[row.id] === 5 ? false : selectedCheck[row.id];
      const isSelectEmpty = !selectedAccessType[row.id];
      const isSelectEmpty1 = !row.accessType;

      if (!isChecked && isSelectEmpty && isSelectEmpty1) {
        newErrors[row.id] = "Заполните"; // Сообщение об ошибке
      } else {
        // Удаляем ошибку, если условия не выполняются
        newErrors[row.id] = null;
      }
    });
    setErrors(newErrors);
  }, [selectedCheck, selectedAccessType, listModalTitles]);

  useEffect(() => {
    // Инициализация sumForOneTitle
    const initialSumForOneTitle = listModalTitles.reduce((acc, row) => {
      const price = selectedCheck[row.id]
        ? selectedProduct[row.id]?.priceBooklet || row.price.priceBooklet
        : selectedProduct[row.id]?.priceAccess || row.price.priceAccess;
      acc[row.id] = parseFloat(selectedInput[row.id] || 0) * price;
      return acc;
    }, {});

    setSumForOneTitle(initialSumForOneTitle);
  }, [
    selectedProduct,
    productId,
    selectedCheck,
    selectedInput,
    listModalTitles,
  ]);

  const OpenModal = (id) => {
    setIsLoadingModal(true);
    setOpenStates({ ...openStates, [id]: true });
  };

  const resetStatesNewTitles = () => {
    setcheckProductBooklet({});
    setSelectProductGeneration({});
    setSelectProductAccessType({});
    setProductInputQuantity({});
    setIsFieldClearedProduct({});
    setSumForOneProduct({});
  };
  const resetAddSelectProduct = () => {
    setExitAddSelectProduct(false);
  };
  const handleCloseModal = (id) => {
    setExitAddSelectProduct(true);

    setOpenStates({ ...openStates, [id]: false });

    setProducts(null);
    setIsInputCleared(false);

    resetStatesNewTitles();
    resetStates();
  };

  const handleDeleteOrder = (orderId, titleId) => {
    setIsLoadingDelete(true);
    dispatch(
      deleteTitleOrder({
        accountId: accountId,
        orderId: orderId,
        titleId: titleId,
      })
    ).then(
      () => {
        dispatch(getOrder(accountId));
        setIsDeleteClicked(true);
        setIsLoadingDelete(false);
        setSnackbarOpenDelete(true);
      },
      () => {
        setIsLoadingDelete(false);
        setSnackbarOpenDelete(true);
      }
    );
  };

  const handleChangeSelectAbbr = (event, id) => {
    setSelectedAbbr((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleChangeGeneration = (event, id) => {
    setSelectedGeneration((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleChangeInput = (e, id, price) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue === "") {
      setSelectedInput((prevState) => ({
        ...prevState,
        [id]: undefined,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    } else {
      setSelectedInput((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
      setIsFieldCleared((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  const handleCheckboxChange = (event, id) => {
    setSelectedCheck((prevState) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };

  const handleCheckboxChangeDeposit = (event) => {
    setSelectedCheckDeposit(event.target.checked);
  };

  const handleChangeAccessType = (event, id) => {
    setSelectedAccessType((prevState) => ({
      ...prevState,
      [id]: event.target.value,
    }));
  };

  const handleSave = (exitID) => {
    setIsLoadingModalSave(true);
    const titlesToUpdate = [];

    listModalTitles.forEach((row) => {
      if (row.productTypeId === 4) {
        titlesToUpdate.push({
          id: row.id,
          productId: productId[row.id] ? productId[row.id] : row.productId,

          accessType: null,

          generation: null,

          quantity: selectedInput[row.id],
          addBooklet: false,
        });
      } else {
        titlesToUpdate.push({
          id: row.id,
          productId: productId[row.id] ? productId[row.id] : row.productId,

          accessType: selectedCheck[row.id]
            ? null
            : selectedAccessType[row.id]
              ? selectedAccessType[row.id]
              : row.accessType,

          generation: selectedGeneration[row.id]
            ? selectedGeneration[row.id]
            : row.generation,

          quantity: selectedInput[row.id],
          addBooklet:
            selectedCheck[row.id] === 5 ? row.addBooklet : selectedCheck[row.id],
        });
      }
    });

    const titlesToCreate = [];
    products?.forEach((item) => {
      if (item.productTypeId === 4) {
        titlesToCreate.push({
          productId: item.id,

          accessType: null,

          generation: null,

          quantity: productInputQuantity[item.id]
            ? productInputQuantity[item.id]
            : 1,

          addBooklet: false,

        });
      } else {
        titlesToCreate.push({
          productId: item.id,

          accessType: checkProductBooklet[item.id]
            ? null
            : selectProductAccessType[item.id]
              ? selectProductAccessType[item.id]
              : "Электронный",

          generation: selectProductGeneration[item.id]
            ? selectProductGeneration[item.id]
            : "Второе поколение",

          quantity: productInputQuantity[item.id]
            ? productInputQuantity[item.id]
            : 1,

          addBooklet:
            checkProductBooklet[item.id] === undefined
              ? products.addBooklet
              : checkProductBooklet[item.id],

        });
      }

    });

    dispatch(
      updateTitleOrderAdmin({
        accountId: accountId,
        orderId: ObjectModalOrder.id,
        organizationName: selectOrganization[ObjectModalOrder.id]
          ? selectOrganization[ObjectModalOrder.id]
          : ObjectModalOrder.organizationName,
        status: selectStatus[ObjectModalOrder.id]
          ? selectStatus[ObjectModalOrder.id]
          : ObjectModalOrder.status,
        billNumber: inputAccountNumber[ObjectModalOrder.id]
          ? inputAccountNumber[ObjectModalOrder.id]
          : ObjectModalOrder.billNumber,
        payeeId: payeeName[ObjectModalOrder.id]
          ? payeeName[ObjectModalOrder.id]
          : ObjectModalOrder.payeeId,
        isFromDeposit:
          selectedCheckDeposit === undefined
            ? ObjectModalOrder.isFromDeposit
            : selectedCheckDeposit,
        titlesToUpdate: titlesToUpdate,
        titlesToCreate: titlesToCreate,
      })
    ).then(
      () => {
        dispatch(getOrder(accountId));
        setOpenStates({ ...openStates, [exitID]: false });
        handleCloseModal(exitID);
        setIsLoadingModalSave(false);
        setSnackbarOpen(true);
      },
      () => {
        setIsLoadingModalSave(false);
        setSnackbarOpen(true);
      }
    );
  };

  // Функция для сброса состояний
  const resetStates = () => {
    setExitAddSelectProduct(true);
    resetStatesNewTitles();
    setProducts(null);
    // Сброс selectedAbbr
    const initialSelectedAbbr = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.abbr;
      return acc;
    }, {});

    setSelectedAbbr(initialSelectedAbbr);

    // Сброс selectedCheck
    const initialSelectedCheck = listModalTitles.reduce((acc, row) => {
      acc[row.id] = 5;
      return acc;
    }, {});

    setSelectedCheck(initialSelectedCheck);

    // Сброс selectedAccessType
    const initialSelectedAccessType = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.accessType;
      return acc;
    }, {});

    setSelectedAccessType(initialSelectedAccessType);

    // Сброс selectedGeneration
    const initialSelectedGeneration = listModalTitles.reduce((acc, row) => {
      acc[row.id] = "";
      return acc;
    }, {});

    setSelectedGeneration(initialSelectedGeneration);

    // Сброс selectedInput
    const initialSelectedInput = listModalTitles.reduce((acc, row) => {
      acc[row.id] = row.quantity;
      return acc;
    }, {});

    setSelectedInput(initialSelectedInput);

    //Первая таблица
    setSelectOrganization(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.organizationName,
      }),
      {}
    );
    setPayeeName({});
    setSelectStatus({});
    setSelectedCheckDeposit();
    setInputAccountNumber(
      () => ({
        [ObjectModalOrder.id]: ObjectModalOrder.billNumber,
      }),
      {}
    );
  };

  const handleChangeSelectOrganization = (event, id) => {
    setSelectOrganization(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangeSelectStatus = (event, id) => {
    setSelectStatus(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangePayeeName = (event, id) => {
    setPayeeName(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangeInputAccountNumber = (event, id) => {
    if (event.target.value === "") {
      setIsInputCleared(true);
    } else {
      setIsInputCleared(false);
    }

    setInputAccountNumber(() => ({
      [id]: event.target.value,
    }));
  };

  const handleChangeModalAdd = () => {
    dispatch(getNewOrder(accountId));
    setIsOpen(true);
  };

  const handleChangeModalUpdate = () => {
    dispatch(getNewOrder(accountId));
    setIsOpenModalUpdate(true);
  };

  // Text Header
  const TextHeader = styled(TableCell)({
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontWeight: 600,
    color: "#005475",
    borderBottom: "3px solid #005475",
    textAlign: "center",
    // Добавляем класс hoverEffect для применения стилей при наведении
    "&.hoverEffect": {
      transition: "background-color 0.3s ease",
    },
    "&.hoverEffect:hover": {
      backgroundColor: "#47bcd6", // Более темный оттенок #005475
    },
  });

  const TableCellModal = styled(TableCell)({
    fontFamily: "Montserrat",
    fontSize: "16px",
    textAlign: "center",
  });

  // Typography
  const TypographyStyle = styled(Typography)({
    fontFamily: "'Montserrat'",
    fontSize: "16px",
    fontWeight: 700,
    float: "right",
    marginTop: "15px",
    marginRight: "15px",
    marginBottom: "15px",
  });

  const sortNumber = (name) => {
    const sortedData = [...sortedOrders];
    switch (name) {
      case "Number":
        sortedData.sort((a, b) => {
          if (a.orderNumber > b.orderNumber) {
            return 1;
          } else if (a.orderNumber < b.orderNumber) {
            return -1;
          }
          return 0;
        });
        setSortedOrders(sortedData);
        break;

      case "fullName":
        sortedData.sort((a, b) => {
          if (a.fullName > b.fullName) {
            return 1;
          } else if (a.fullName < b.fullName) {
            return -1;
          }
          return 0;
        });
        setSortedOrders(sortedData);
        break;

      case "organizationName":
        sortedData.sort((a, b) => {
          if (a.organizationName > b.organizationName) {
            return 1;
          } else if (a.organizationName < b.organizationName) {
            return -1;
          }
          return 0;
        });
        setSortedOrders(sortedData);
        break;

      case "formattedDispatchDate":
        sortedData.sort((a, b) => {
          if (a.dispatchDate > b.dispatchDate) {
            return 1;
          } else if (a.dispatchDate < b.dispatchDate) {
            return -1;
          }
          return 0;
        });
        setSortedOrders(sortedData);
        break;

      case "billNumber":
        sortedData.sort((a, b) => {
          if (a.billNumber > b.billNumber) {
            return 1;
          } else if (a.billNumber < b.billNumber) {
            return -1;
          } else {
            if (a.dispatchDate > b.dispatchDate) {
              return 1;
            } else if (a.dispatchDate < b.dispatchDate) {
              return -1;
            }
            return 0;
          }
        });
        setSortedOrders(sortedData);
        break;
    }
  };

  useEffect(() => {
    OpenModal(id)
  }, [])

  return (
    <Box>


      {/* <Box sx={{ flexGrow: 1, fontFamily: "'Montserrat', sans-serif" , mt:'55px'}}>
      {orders.map((element) => (
        <Grid key={element.id} container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color: element.status === 'Черновик' ? '#B4B4B4' : 'black' }} onClick={() => OpenModal(element.id)}>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ fontSize: '14px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>№{element.orderNumber}</Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'flex-start' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                {element.fullName}
              </Box>
              <Box sx={{ fontSize: '12px', fontWeight: '400' }} >{element.organizationName}</Box>
              <Box sx={{ fontSize: '12px', fontWeight: '400', fontStyle: 'italic' }}>{element.formattedDispatchDate}</Box>
            </Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '12px', fontWeight: '400', }}>{element.status}</Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '14px', fontWeight: '400', }}>{element.SUM}</Box>
          </Grid>
        </Grid>
      ))}
    </Box> */}

      {orders.map((element) => {
        return (
          <>

            {(openStates[element.id] || false) && (
              <>

                <IconButton
                  onClick={() => handleCloseModal(element.id)}
                  sx={{
                    position: "absolute",
                    float: "right",
                    top: "-38px",
                    right: "-40px",
                  }}
                >
                  <img src={exit} alt="закрыть" />
                </IconButton>





                {element.status === "Активный" ||
                  element.status === "Выставлен счёт" ? (
                  <Grid sx={{ position: 'fixed', top: 60, left: 0, bottom: 0, right: 0, width: '100%', height: '250px', zIndex: 1000, overflow: 'hidden' }}>

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
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              selectOrganization[ObjectModalOrder.id] ||
                              ObjectModalOrder.organizationName
                            }
                            onChange={(event) =>
                              handleChangeSelectOrganization(
                                event,
                                ObjectModalOrder.id
                              )
                            }
                          >
                            {[...allOrganizationsModal]
                              ?.sort()
                              ?.map((organization, index) => (
                                <MenuItem
                                  key={index}
                                  value={organization}
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "16px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  {organization}
                                </MenuItem>
                              ))}
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

                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              payeeName[ObjectModalOrder.id] ||
                              ObjectModalOrder.payeeId
                            }
                            onChange={(event) =>
                              handleChangePayeeName(
                                event,
                                ObjectModalOrder.id
                              )
                            }
                          >
                            {listModalPayees.map((payee) => (
                              <MenuItem
                                key={payee.id}
                                value={payee.id}
                                sx={{
                                  fontFamily: "Montserrat",
                                  fontSize: "16px",

                                  textAlign: "center",
                                  cursor: "pointer",
                                }}
                              >
                                {payee.name}
                              </MenuItem>
                            ))}
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
                              textAlign: "center",
                              cursor: "pointer",
                              width: "150px",
                            }}
                            value={
                              selectStatus[ObjectModalOrder.id] ||
                              ObjectModalOrder.status
                            }
                            onChange={(event) =>
                              handleChangeSelectStatus(
                                event,
                                ObjectModalOrder.id
                              )
                            }
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
                            value={
                              inputAccountNumber[ObjectModalOrder.id] ||
                              (isInputCleared
                                ? ""
                                : ObjectModalOrder.billNumber)
                            }
                            onChange={(event) =>
                              handleChangeInputAccountNumber(
                                event,
                                ObjectModalOrder.id
                              )
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

                            textAlign: "center",
                          }}
                        >
                          <CustomStyledCheckbox
                            sx={{ textAlign: "center" }}
                            checked={
                              selectedCheckDeposit === undefined
                                ? ObjectModalOrder.isFromDeposit
                                : selectedCheckDeposit
                            }
                            onChange={(event) =>
                              handleCheckboxChangeDeposit(event)
                            }
                            size={1}
                          ></CustomStyledCheckbox>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : element.status === "Отправлен" ||
                  element.status === "Оплачен" ? (
                  <Grid sx={{ position: 'fixed', top: 60, left: 0, bottom: 0, right: 0, width: '100%', height: '250px', zIndex: 1000, overflow: 'hidden' }}>

                    <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                      <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                          Академия
                        </Box>
                      </Grid>
                      <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                          {ObjectModalOrder.organizationName}
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
                          {ObjectModalOrder.payeeName}
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
                          {element.status === "Оплачен" ? (
                            <Select
                              variant="standard"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                textAlign: "center",
                                cursor: "pointer",
                                width: "150px",
                              }}
                              value={
                                selectStatus[ObjectModalOrder.id] ||
                                ObjectModalOrder.status
                              }
                              onChange={(event) =>
                                handleChangeSelectStatus(
                                  event,
                                  ObjectModalOrder.id
                                )
                              }
                            >
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
                            </Select>
                          ) : (
                            <Select
                              variant="standard"
                              sx={{
                                fontFamily: "Montserrat",
                                fontSize: "16px",
                                textAlign: "center",
                                cursor: "pointer",
                                width: "150px",
                              }}
                              value={
                                selectStatus[ObjectModalOrder.id] ||
                                ObjectModalOrder.status
                              }
                              onChange={(event) =>
                                handleChangeSelectStatus(
                                  event,
                                  ObjectModalOrder.id
                                )
                              }
                            >
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
                            </Select>
                          )}
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
                          {ObjectModalOrder.billNumber}
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
                        <Box sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",

                          color: "black",
                          textAlign: "center",
                        }}
                        >
                          {ObjectModalOrder.isFromDeposit ? (
                            <img src={check} alt="галка" />
                          ) : (
                            <img
                              src={checkbox}
                              alt="галка"
                              style={{ opacity: "0.6" }}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>

                  </Grid>
                ) : (
                  <Grid sx={{ position: 'fixed', top: 60, left: 0, bottom: 0, right: 0, width: '100%', height: '250px', zIndex: 1000, overflow: 'hidden' }}>

                    <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

                      <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                          Академия
                        </Box>
                      </Grid>
                      <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                          {ObjectModalOrder.organizationName}
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
                          {ObjectModalOrder.payeeName}
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
                          {ObjectModalOrder.status}
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
                          {ObjectModalOrder.billNumber}
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

                          {ObjectModalOrder.isFromDeposit ? (
                            <img src={check} alt="галка" />
                          ) : (
                            <img
                              src={checkbox}
                              alt="галка"
                              style={{ opacity: "0.6" }}
                            />
                          )}

                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                )}



                {listModalTitles[0]?.product.abbreviation == "Д" ? (
                  <>
                    <>


                      {element.status === "Активный" ||
                        element.status === "Выставлен счёт" ? (
                        <Grid sx={{ width: '100%', zIndex: 1, overflow: 'auto', mt: '315px', height: 'calc(100vh - 400px)', position: 'fixed', overflow: 'auto' }}>

                          {listModalTitles.map((row) => (
                            <Box key={row.id}>

                              <Grid container sx={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #005475', }} >
                                <Box
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "18px",
                                    fontWeight: '600',
                                    color: "black",
                                    textAlign: "center",
                                    width: "100%",
                                    mt: 1,
                                    mb: 1,
                                  }}
                                >
                                  Депозит
                                </Box>

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
                                      value={
                                        selectedInput[row.id] ||
                                        (isFieldCleared[row.id]
                                          ? ""
                                          : row.quantity)
                                      }
                                      onChange={(e) =>
                                        handleChangeInput(
                                          e,
                                          row.id,
                                          selectedCheck[row.id]
                                            ? selectedProduct[row.id]
                                              ?.priceBooklet ||
                                            row.price.priceBooklet
                                            : selectedProduct[row.id]
                                              ?.priceAccess ||
                                            row.price.priceAccess
                                        )
                                      }
                                    />
                                  </Box>
                                </Grid>
                              </Grid>

                              <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                    Цена
                                  </Box>
                                </Grid>

                                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                  <Box>
                                    {selectedCheck[row.id]
                                      ? selectedProduct[row.id]?.priceBooklet ||
                                      row.price.priceBooklet
                                      : selectedProduct[row.id]?.priceAccess ||
                                      row.price.priceAccess}
                                    &#x20bd;
                                  </Box>



                                  {/* <Box sx={{ml:1}}>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteOrder(
                                          element.id,
                                          row.id,
                                          selectedProduct[row.id]?.id,
                                          row.product.abbreviation
                                        )
                                      }
                                    >
                                      <img src={deleteGrey} alt="удалить" />
                                    </IconButton>
                                  </Box> */}
                                </Grid>
                                <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                  <Box sx={{ color: '#005475' }} onClick={() =>
                                    handleDeleteOrder(
                                      element.id,
                                      row.id,
                                      selectedProduct[row.id]?.id,
                                      row.product.abbreviation
                                    )}>
                                    Удалить
                                    <IconButton>
                                      <img src={deleteGrey} alt="удалить" />
                                    </IconButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </Grid>
                      ) : (
                        <Grid sx={{ width: '100%', zIndex: 1, overflow: 'auto', mt: '315px', height: 'calc(100vh - 400px)', position: 'fixed', overflow: 'auto' }}>
                          {listModalTitles.map((row) => (
                            <Box key={row.id}>
                              <Grid container sx={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #005475', }} >
                                <Box
                                  sx={{
                                    fontFamily: "Montserrat",
                                    fontSize: "18px",
                                    fontWeight: '600',
                                    color: "black",
                                    textAlign: "center",
                                    width: "100%",
                                    mt: 1,
                                    mb: 1,
                                  }}
                                >
                                  Депозит
                                </Box>

                              </Grid>

                              <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                    Количество
                                  </Box>
                                </Grid>

                                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                  <Box>{row.quantity}</Box>
                                </Grid>
                              </Grid>

                              <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                  <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                    Цена
                                  </Box>
                                </Grid>

                                <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                  <Box>
                                    {row.PriceForOneProduct} &#x20bd;
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                        </Grid>
                      )}
                    </>
                  </>
                ) : (
                  <>

                    
                    {element.status === "Активный" ||
                      element.status === "Выставлен счёт" ? (
                      <>
                      <Grid container sx={{ borderBottom: '2px solid #005475', zIndex: 100, height: '40px', position: 'fixed', top: '0', bottom: '0', left: '0', right: '0', mt: '310px',justifyContent:'center' }}>
                    <Box>
                      <IconButton
                        onClick={() => handleChangeModalUpdate()}
                      >
                        <img src={plus} alt="плюс" />
                      </IconButton>

                    </Box>
                    </Grid>
                        <Grid sx={{ width: '100%', zIndex: 1, overflow: 'auto', mt: '350px', height: 'calc(100vh - 322px)', position: 'fixed', overflow: 'auto' }}>
                          {listModalTitles.map((row) => {
                            if (
                              !disabledAbbreviation.includes(
                                row.productId
                              )
                            ) {
                              disabledAbbreviation.push(row.productId);
                            }

                            return (
                              <Box key={row.id}>
                                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                                  <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                    <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                      Название
                                    </Box>
                                  </Grid>

                                  <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                    <Box>
                                      <Select
                                        variant="standard"
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "16px",

                                          textAlign: "center",
                                          cursor: "pointer",
                                          width: "70px",
                                        }}
                                        value={
                                          selectedAbbr[row.id] ||
                                          row.product.abbreviation
                                        }
                                        onChange={(event) => {
                                          const newSelectedAbbr =
                                            event.target.value;
                                          const product =
                                            ListProductsModal.find(
                                              (p) =>
                                                p.abbreviation ==
                                                newSelectedAbbr
                                            );

                                          setSelectedProduct((prevState) => ({
                                            ...prevState,
                                            [row.id]: product,
                                          }));

                                          handleChangeSelectAbbr(
                                            event,
                                            row.id
                                          );

                                          setProductId((prevState) => ({
                                            ...prevState,
                                            [row.id]: product.id, // Обновляем выбранное значение для данного элемента
                                          }));
                                        }}
                                      >
                                        {ListProductsModal.map((product) => (
                                          <MenuItem
                                            key={product.id}
                                            value={product.abbreviation}
                                            sx={{
                                              fontFamily: "Montserrat",
                                              fontSize: "16px",
                                              textAlign: "center",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {product.abbreviation}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </Box>
                                  </Grid>
                                </Grid>

                                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                                  <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                    <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                      Доступ
                                    </Box>
                                  </Grid>

                                  <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                    <Box>
                                      {selectedCheck[row.id] ? (
                                        <FormControl
                                          error={!!errors[row.id]}
                                          fullWidth
                                        >
                                          <Select
                                            variant="standard"
                                            sx={{
                                              fontFamily: "Montserrat",
                                              fontSize: "16px",
                                              textAlign: "center",
                                              cursor: "pointer",
                                              width: "150px",
                                            }}
                                            value={
                                              selectedCheck[row.id]
                                                ? selectedCheck[row.id] === 5
                                                  ? row.accessType
                                                  : null
                                                : selectedAccessType[row.id]
                                                  ? selectedAccessType[row.id]
                                                  : row.accessType // не может быть
                                            }
                                            onChange={(e) =>
                                              handleChangeAccessType(
                                                e,
                                                row.id
                                              )
                                            }
                                            disabled={
                                              selectedCheck[row.id]
                                                ? selectedCheck[row.id] === 5
                                                  ? row.addBooklet === true
                                                    ? true
                                                    : false
                                                  : true
                                                : null // не можект быть
                                            }

                                          // Добавляем условие для отключения
                                          // displayEmpty
                                          // renderValue={(selected) =>
                                          //   selected === null ? null : selected
                                          // }
                                          >
                                            <MenuItem
                                              value="Электронный"
                                              sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Электронный
                                            </MenuItem>
                                            <MenuItem
                                              value="Бумажный"
                                              sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Бумажный
                                            </MenuItem>
                                          </Select>
                                          <FormHelperText error>
                                            {errors[row.id]}
                                          </FormHelperText>
                                        </FormControl>
                                      ) : (
                                        <FormControl
                                          error={!!errors[row.id]}
                                          fullWidth
                                        >
                                          <Select
                                            variant="standard"
                                            sx={{
                                              fontFamily: "Montserrat",
                                              fontSize: "16px",
                                              textAlign: "center",
                                              cursor: "pointer",
                                              width: "150px",
                                            }}
                                            value={
                                              selectedAccessType[row.id] ||
                                              row.accessType
                                            }
                                            onChange={(e) =>
                                              handleChangeAccessType(
                                                e,
                                                row.id
                                              )
                                            }
                                          // disabled={
                                          //   selectedCheck[row.id] || false
                                          // } // Добавляем условие для отключения
                                          // displayEmpty
                                          // renderValue={(selected) =>
                                          //   selected === null ? null : selected
                                          // }
                                          >
                                            {/* <MenuItem
                                            value={null}
                                            disabled
                                          ></MenuItem> */}

                                            <MenuItem
                                              value="Электронный"
                                              sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Электронный
                                            </MenuItem>
                                            <MenuItem
                                              value="Бумажный"
                                              sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",
                                                textAlign: "center",
                                                cursor: "pointer",
                                              }}
                                            >
                                              Бумажный
                                            </MenuItem>
                                          </Select>
                                          <FormHelperText error>
                                            {errors[row.id]}
                                          </FormHelperText>
                                        </FormControl>
                                      )}
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
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "16px",
                                          textAlign: "center",
                                          cursor: "pointer",
                                          width: "150px",
                                        }}
                                        value={
                                          selectedGeneration[row.id] ||
                                          row.generation
                                        }
                                        onChange={(e) =>
                                          handleChangeGeneration(e, row.id)
                                        }
                                      >
                                        <MenuItem
                                          value="Первое поколение"
                                          sx={{
                                            fontFamily: "Montserrat",
                                            fontSize: "16px",
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

                                    <Box sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",

                                      color: "black",
                                      textAlign: "center",
                                    }}>
                                      <CustomStyledCheckbox
                                        sx={{ textAlign: "center" }}
                                        checked={
                                          selectedCheck[row.id] === 5
                                            ? row.addBooklet
                                            : selectedCheck[row.id]
                                        }
                                        onChange={(event) =>
                                          handleCheckboxChange(event, row.id)
                                        }
                                        size={1}
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
                                        value={
                                          selectedInput[row.id] ||
                                          (isFieldCleared[row.id]
                                            ? ""
                                            : row.quantity)
                                        }
                                        onChange={(e) =>
                                          handleChangeInput(
                                            e,
                                            row.id,
                                            selectedCheck[row.id]
                                              ? selectedProduct[row.id]
                                                ?.priceBooklet ||
                                              row.price.priceBooklet
                                              : selectedProduct[row.id]
                                                ?.priceAccess ||
                                              row.price.priceAccess
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

                                    <Box>
                                      {selectedCheck[row.id]
                                        ? selectedProduct[row.id]
                                          ?.priceBooklet ||
                                        row.price.priceBooklet
                                        : selectedProduct[row.id]
                                          ?.priceAccess ||
                                        row.price.priceAccess}
                                      &#x20bd;
                                    </Box>
                                    <Box>
                                      <IconButton
                                        sx={{ ml: 4 }}
                                        onClick={() =>
                                          handleDeleteOrder(
                                            element.id,
                                            row.id,
                                            selectedProduct[row.id]?.id,
                                            row.product.abbreviation
                                          )
                                        }
                                      >
                                        <img src={deleteGrey} alt="удалить" />
                                      </IconButton>
                                    </Box>
                                  </Grid>
                                </Grid>




                              </Box>
                            );
                          })}


                          {/* <Grid sx={{ width: '100%', zIndex: 1, overflow: 'auto', mt: '345px', height: 'calc(100vh - 400px)', position: 'fixed', overflow: 'auto' }}> */}
                          {Array.isArray(products) &&
                            products?.map((product) => {
                              if (
                                product.productTypeId === 4
                              ) {
                                return (
                                  <Box key={product.id}>
                                    <Grid container sx={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #B4B4B4', }} >
                                      <Box
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "18px",
                                          fontWeight: '600',
                                          color: "black",
                                          textAlign: "center",
                                          width: "100%",
                                          mt: 1,
                                          mb: 1,
                                        }}
                                      >
                                        ertyuiouytrsdfghjklkjhgfdsdfghjkjhgfd
                                      </Box>
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
                                              productInputQuantity[
                                              product.id
                                              ] ||
                                              (isFieldClearedProduct[
                                                product.id
                                              ]
                                                ? ""
                                                : 1)
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

                                        <Box>
                                          {sumForOneProduct[product.id]}
                                          &#x20bd;
                                        </Box>
                                      </Grid></Grid>

                                    {/* <TableCell
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        color: "black",
                                        textAlign: "center",
                                      }}
                                    >
                                      {sumForOneProduct[product.id]}{" "}
                                      &#x20bd;
                                    </TableCell> */}


                                  </Box>
                                );
                              } else {
                                return (
                                  <Box key={product.id}>
                                    <Grid container sx={{ justifyContent: 'center', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #B4B4B4', }} >
                                      <Box
                                        sx={{
                                          fontFamily: "Montserrat",
                                          fontSize: "18px",
                                          fontWeight: '600',
                                          color: "black",
                                          textAlign: "center",
                                          width: "100%",
                                          mt: 1,
                                          mb: 1,
                                        }}
                                      >
                                        {product.name.split("&quot;").join('"')}
                                      </Box>
                                    </Grid>



                                    <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
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
                                                : selectProductAccessType[
                                                product.id
                                                ] || "Электронный"
                                            }
                                            disabled={
                                              checkProductBooklet[
                                              product.id
                                              ] || false
                                            } // Добавляем условие для отключения
                                            onChange={(event) =>
                                              handleChangeAccessTypeProduct(
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
                                      </Grid></Grid>


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
                                              selectProductGeneration[
                                              product.id
                                              ] || "Второе поколение"
                                            }
                                            onChange={(event) =>
                                              handleChangeGenerationProduct(
                                                event,
                                                product.id
                                              )
                                            }
                                            sx={{
                                              fontFamily: "Montserrat",
                                              fontSize: "16px",
                                              color: "black",
                                              textAlign: "center",
                                              cursor: "pointer",
                                              width: "200px",
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
                                      </Grid></Grid>

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
                                            checked={
                                              checkProductBooklet[
                                                product.id
                                              ] === undefined
                                                ? products.addBooklet
                                                : checkProductBooklet[
                                                product.id
                                                ]
                                            }
                                            onChange={(event) =>
                                              handleChangeCheckboxBooklet(
                                                event,
                                                product.id
                                              )
                                            }
                                          ></CustomStyledCheckbox>
                                        </Box>
                                      </Grid></Grid>

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
                                              productInputQuantity[
                                              product.id
                                              ] ||
                                              (isFieldClearedProduct[
                                                product.id
                                              ]
                                                ? ""
                                                : 1)
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
                                      </Grid></Grid>


                                    <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif", borderBottom: '1px solid #B4B4B4' }} >
                                      <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                          Цена
                                        </Box>
                                      </Grid>

                                      <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                        <Box>
                                          {checkProductBooklet[product.id]
                                            ? product.priceBooklet
                                            : product.priceAccess}
                                          &#x20bd;
                                        </Box>
                                      </Grid></Grid>
                                    {/* <TableCell
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",
                                        color: "black",
                                        textAlign: "center",
                                      }}
                                    >
                                      {sumForOneProduct[product.id]}{" "}
                                      &#x20bd;
                                    </TableCell> */}


                                  </Box>
                                );
                              }
                            })}
                        </Grid>
                      </>
                    ) : (
                      <Grid sx={{ width: '100%', zIndex: 1, overflow: 'auto', mt: '320px', height: 'calc(100vh - 300px)', position: 'fixed', overflow: 'auto' }}>
                        {listModalTitles.map((row) => (
                          <Box key={row.id}>
                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                  Название
                                </Box>
                              </Grid>

                              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                <Box>
                                  {row.product.abbreviation}
                                </Box>
                              </Grid>
                            </Grid>

                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                  Доступ
                                </Box>
                              </Grid>

                              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                <Box>
                                  {row.accessType}
                                </Box>
                              </Grid></Grid>

                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                  Поколение
                                </Box>
                              </Grid>

                              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                <Box>
                                  {row.generation}
                                </Box>
                              </Grid></Grid>

                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                  Доп.Буклет
                                </Box>
                              </Grid>

                              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                <Box>
                                  {row.addBooklet ? (
                                    <img src={check} alt="галка" />
                                  ) : (
                                    <img
                                      src={checkbox}
                                      alt="галка"
                                      style={{ opacity: "0.6" }}
                                    />
                                  )}
                                </Box>
                              </Grid></Grid>

                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >
                              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                  Количество
                                </Box>
                              </Grid>

                              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                <Box>
                                  {row.quantity}
                                </Box>
                              </Grid></Grid>

                            <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif",borderBottom: '1px solid #B4B4B4' }} >
                              <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                                <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                                  Цена
                                </Box>
                              </Grid>

                              <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >

                                <Box>
                                  {row.PriceForOneProduct} &#x20bd;
                                </Box>
                              </Grid></Grid>

                          </Box>
                        ))}
                      </Grid>
                    )}
                  </>

                )}


                {element.status === "Активный" ||
                  element.status === "Выставлен счёт" ||
                  element.status === "Отправлен" ||
                  element.status === "Оплачен" ? (

                  <Box
                    sx={{

                      position: 'fixed',
                      zIndex: 1000,
                      left: 0,
                      bottom: 1,
                      width: '100%',
                      height: '50px',
                      backgroundColor: 'white',
                      color: '#005475', // Белый цвет текста для контраста
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0 -1px 1px rgba(0, 0, 0, 0.25)',

                    }}
                  >
                    <TypographyStyle>
                      Итого: {totalSum + totalSumProduct} &#x20bd;
                    </TypographyStyle>
                    <Button
                      variant="contained"
                      onClick={() => handleSave(element.id)}
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#005475",
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
                      onClick={() => resetStates(element.id)}
                      sx={{
                        variant: "contained",
                        textTransform: "none",
                        backgroundColor: "#CCCCCC",
                        color: "#000000",
                        fontSize: "14px",
                        ml: 3,
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
                ) : (
                  ""
                )}

              </>
            )}
          </>
        );
      })}



      <ErrorHandler
        error={errorUpdateTitleOrderAdmin}
        snackbarOpen={snackbarOpen}
        close={setSnackbarOpen}
        text={"Заказ обновлен"}
      ></ErrorHandler>

      <ErrorHandler
        error={errorDeleteTitleOrder}
        snackbarOpen={snackbarOpenDelete}
        close={setSnackbarOpenDelete}
        text={"Наименование удалено"}
      ></ErrorHandler>

      <AddSelectProduct
        disabledAbbreviation={disabledAbbreviation}
        isOpenModalUpdate={isOpenModalUpdate}
        allProducts={sortAllProducts}
        setIsOpenModalUpdate={setIsOpenModalUpdate}
        selectProducts={handleChangeModalProduct}
        exitAddSelectProduct={exitAddSelectProduct}
        resetAddSelectProduct={resetAddSelectProduct}
        deleteTitles={deleteTitles}
        stateDeleteTitles={stateDeleteTitles}
        updateProductDelete={products}
      ></AddSelectProduct>

      {/* <Add
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        allPayees={allPayees}
        allOrganizations={allOrganizations}
        allProducts={sortAllProducts}
      ></Add> */}
    </Box>
  );
}
