import React from 'react'
import { Grid, Box } from '@mui/material'
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
    Button,
    Select,
    MenuItem,
    Modal,
    Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import deleteGrey from "../../currentOrder/addOrder/image/deleteGrey.svg";
import plus from "../../currentOrder/addOrder/image/plus.svg"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
    deleteRule,
    incrementDummyKey,
    putAccrualRule,
    getRules
} from "../../../../BLL/superAdmin/comissionSlice.js"

export const TableRules = () => {

    const dispatch = useDispatch();
    const { accountId, commisionRecieverId } = useParams();
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [groupProducts, setGroupProducts] = useState({});
    const [newProductsAutocomplete, setNewProductsAutocomplete] = useState([]);
    const [productsAutocomplete, setProductsAutocomplete] = useState({});
    const [selectedAccessType, setSelectedAccessType] = useState({});
    const [selectedGeneration, setSelectedGeneration] = useState({});
    const [accrual, setAccrual] = useState({});
    const [dummyKey, setDummyKey] = useState(0);

    const [isFieldCleared, setIsFieldCleared] = useState({});

    // const [isSave, setIsSave] = useState({});

    

    const rules = useSelector((state) => state.superAdminCommision?.rules || []);
    console.log(rules)
    const errorPutAccrualRule = useSelector(
        (state) => state.superAdminCommision?.errorPutAccrualRule
    );
    const errorDeleteRule = useSelector(
        (state) => state.superAdminCommision?.errorDeleteRule
    );
    const allProducts = useSelector(
        (state) => state.superAdminCommision?.allProducts || []
    );
useEffect(()=>{
        dispatch(getRules({accountId: accountId, commisionRecieverId: commisionRecieverId}))
    },[accountId,commisionRecieverId, dummyKey])

    const [snackbarOpenDeleteRule, setSnackbarOpenDeleteRule] = useState(false);
    const [snackbarOpenPutAccrualRule, setSnackbarOpenPutAccrualRule] =
        useState(false);

    const [newProducts, setNewProducts] = useState([]);
    const addProducts = () => {
        setNewProducts([
            ...newProducts,
            {
                id: new Date().toISOString(),
                groupProducts: null,
                products: null,
                generation: null,
                accessType: "Бумажный",
                accrual: null,
            },
        ]);
    };

    const deleteNew = (id) => {
        setNewProducts(newProducts.filter((product) => product.id !== id));
    };
    const deleteOld = (commisionRecieverId, ruleId) => {
        setLoadingDelete(true);
        dispatch(
            deleteRule({
                accountId: accountId,
                commisionRecieverId: commisionRecieverId,
                ruleId: ruleId,
            })
        ).then(
            () => {
                setDummyKey(prevState=> prevState+1)
                dispatch(incrementDummyKey());
                setSnackbarOpenDeleteRule(true);
                setLoadingDelete(false);
            },
            () => {
                setSnackbarOpenDeleteRule(true);
                setLoadingDelete(false);
            }
        );
    };

    const handleChangeGroupProducts = (event, id) => {
        setGroupProducts((prevState) => ({
            ...prevState,
            [id]: event.target.value,
        }));
    };

    const handleChangeNewProducts = (event, newValue) => {
        const idsOfSelectedProducts = newValue.map(
            (selectedOption) => selectedOption.id
        );
        setNewProductsAutocomplete(idsOfSelectedProducts);
        // console.log(idsOfSelectedProducts);
    };

    // const handleChangeProducts = (event, newValue) => {
    //   rules.map((element) =>
    //     setProductsAutocomplete((prevState) => ({
    //       ...prevState,
    //       [element.id]: newValue,
    //     }))
    //   );
    // };

    const handleChangeProducts = (event, id) => {
        setProductsAutocomplete((prevState) => ({
            ...prevState,
            [id]: event.target.value,
        }));
    };

    // useEffect(() => {
    //   const newState = {};
    //   rules.forEach((rule) => {
    //     const matchingProduct = allProducts.find(
    //       (product) => product.id === rule.productId
    //     );
    //     if (matchingProduct) {
    //       newState[rule.id] = matchingProduct;
    //     }
    //   });
    //   setProductsAutocomplete(newState);
    // }, [rules]);

    const handleChangeAccrual = (e, id) => {
        const newValue = e.target.value.replace(/[^0-9]/g, "");
        if (newValue === "") {
            setAccrual((prevState) => ({
                ...prevState,
                [id]: undefined,
            }));
            setIsFieldCleared((prevState) => ({
                ...prevState,
                [id]: true,
            }));
        } else {
            setAccrual((prevState) => ({
                ...prevState,
                [id]: newValue,
            }));
            setIsFieldCleared((prevState) => ({
                ...prevState,
                [id]: false,
            }));
        }
    };

    const handleChangeGeneration = (event, id) => {
        setSelectedGeneration((prevState) => ({
            ...prevState,
            [id]: event.target.value, // Обновляем выбранное значение для данного элемента
        }));
    };

    const handleChangeAccessType = (event, id) => {
        setSelectedAccessType((prevState) => ({
            ...prevState,
            [id]: event.target.value, // Обновляем выбранное значение для данного элемента
        }));
    };

    useEffect(() => {
        rules.map((element) => {
            setDisabledProductTypeId((prevState) => ({
                ...prevState,
                [element.id]: element.productId ? false : true,
            }));
            setDisabledProductId((prevState) => ({
                ...prevState,
                [element.id]: element.productTypeId ? false : true,
            }));
        });
    }, [rules]);

    const [disabledProductTypeId, setDisabledProductTypeId] = useState({});
    const [disabledProductId, setDisabledProductId] = useState({});

    useEffect(() => {
        rules.map((rules) => {
            if (groupProducts[rules.id]) {
                if (groupProducts[rules.id] === "null") {
                    setDisabledProductId((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                    setDisabledProductTypeId((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                } else {
                    setDisabledProductId((prevState) => ({
                        ...prevState,
                        [rules.id]: true,
                    }));
                    setDisabledProductTypeId((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                    //Обнуление
                    setSelectedGeneration((prevState) => ({
                        ...prevState,
                        [rules.id]: "null", // Обновляем выбранное значение для данного элемента
                    }));
                    setSelectedAccessType((prevState) => ({
                        ...prevState,
                        [rules.id]: "null", // Обновляем выбранное значение для данного элемента
                    }));
                }
            }
        });
    }, [groupProducts]);

    useEffect(() => {
        rules.map((rules) => {
            if (productsAutocomplete[rules.id]) {
                if (productsAutocomplete[rules.id] === "null") {
                    setDisabledProductTypeId((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                    setDisabledProductId((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                } else {
                    setDisabledProductTypeId((prevState) => ({
                        ...prevState,
                        [rules.id]: true,
                    }));
                    setDisabledProductId((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                }
            }
        });
    }, [productsAutocomplete]);

    const [disabledProductTypeIdNew, setDisabledProductTypeIdNew] = useState({});
    const [disabledProductIdNew, setDisabledProductIdNew] = useState({});

    useEffect(() => {
        newProducts.map((rules) => {
            if (groupProducts[rules.id]) {
                if (groupProducts[rules.id] === "null") {
                    setDisabledProductIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                    setDisabledProductTypeIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                } else {
                    setDisabledProductIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: true,
                    }));
                    setDisabledProductTypeIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                    //Обнуление
                    setSelectedGeneration((prevState) => ({
                        ...prevState,
                        [rules.id]: "null", // Обновляем выбранное значение для данного элемента
                    }));
                    setSelectedAccessType((prevState) => ({
                        ...prevState,
                        [rules.id]: "null", // Обновляем выбранное значение для данного элемента
                    }));
                }
            }
        });
    }, [groupProducts]);

    useEffect(() => {
        newProducts.map((rules) => {
            if (newProductsAutocomplete[rules.id]) {
                if (newProductsAutocomplete[rules.id] === "null") {
                    setDisabledProductTypeIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                    setDisabledProductIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                } else {
                    setDisabledProductTypeIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: true,
                    }));
                    setDisabledProductIdNew((prevState) => ({
                        ...prevState,
                        [rules.id]: false,
                    }));
                }
            }
        });
    }, [newProductsAutocomplete]);

    const handleSave = (id) => {
        setLoadingSave(true);
        const rulesToUpdate = [];

        rules.forEach((element) => {
            rulesToUpdate.push({
                id: element.id,
                productTypeId: groupProducts[element.id] || element.productTypeId,
                productId: productsAutocomplete[element.id] || element.productId,
                accessType: selectedAccessType[element.id] || element.accessType,
                generation: selectedGeneration[element.id] || element.generation,
                commision: accrual[element.id] || element.commision,
            });
        });

        newProducts.forEach((element) => {
            let a = 0;

            newProductsAutocomplete.map((element) => {
                a += 1;
                rulesToUpdate.push({
                    id: null,
                    productTypeId: null,
                    productId: element,
                    accessType: selectedAccessType[element.id],
                    generation: selectedGeneration[element.id],
                    commision: accrual[element.id],
                });
            });

            if (a === 0) {
                rulesToUpdate.push({
                    id: null,
                    productTypeId: groupProducts[element.id],
                    productId: null,
                    accessType: null,
                    generation: null,
                    commision: accrual[element.id],
                });
            }
        });

        console.log(`rulesToUpdate ${[...rulesToUpdate]}`);
        dispatch(
            putAccrualRule({
                accountId: accountId,
                commisionRecieverId: id,
                rulesToUpdate: rulesToUpdate,
            })
        ).then(
            () => {
                dispatch(incrementDummyKey());
                setNewProducts([]);
                setLoadingSave(false);
                setSnackbarOpenPutAccrualRule(true);
                
            },
            () => {
                setSnackbarOpenPutAccrualRule(true);
                setLoadingSave(false);
            }
        );
    };

    const resetStates = () => {
        setGroupProducts({});
        setNewProductsAutocomplete([]);
        setProductsAutocomplete({});
        setSelectedAccessType({});
        setSelectedGeneration({});
        setAccrual({});
        setNewProducts([]);
    };
    return (
        <>
            <Grid sx={{ position: 'fixed', top: 65, left: 0, bottom: 0, right: 0, width: '100%', zIndex: 1000, overflow:'auto' }}>
            <Grid container sx={{ borderBottom: '2px solid #005475', height: '40px',justifyContent:'center' }}>
                    <Box sx={{fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight:'400', }}
                              onClick={() => addProducts()}>
                      Добавить правило
                      <IconButton>
                        <img src={plus} alt="плюс" />
                      </IconButton>

                    </Box>
                    </Grid>
            {rules?.map((element, index) => (
                <>
                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Группа товаров
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
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
                                value={
                                    groupProducts[element.id] === undefined
                                        ? element.productTypeId
                                        : groupProducts[element.id]
                                }
                                onChange={(e) =>
                                    handleChangeGroupProducts(e, element.id)
                                }
                                disabled={
                                    productsAutocomplete[element.id] ===
                                        undefined
                                        ? element.productId
                                            ? true
                                            : false
                                        : disabledProductTypeId[element.id]
                                }
                            >
                                <MenuItem
                                    value="null"
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
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

                                        color: "#999999",
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

                                        color: "#999999",
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

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    Для персонала
                                </MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Товары
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
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
                                value={
                                    productsAutocomplete[element.id] ===
                                        undefined
                                        ? element.productId
                                        : productsAutocomplete[element.id]
                                }
                                onChange={(e) =>
                                    handleChangeProducts(e, element.id)
                                }
                                disabled={
                                    groupProducts[element.id] === undefined
                                        ? element.productTypeId
                                            ? true
                                            : false
                                        : disabledProductId[element.id]
                                }
                            >
                                <MenuItem
                                    value="null"
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    —
                                </MenuItem>
                                {allProducts.map((element) => {
                                    return (
                                        <MenuItem
                                            value={element.id}
                                            sx={{
                                                fontFamily: "Montserrat",
                                                fontSize: "16px",

                                                color: "#999999",
                                                textAlign: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {element.abbreviation}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Box>
                    </Grid>
                </Grid>


                <Grid container sx={{ height: '50px', color: 'black',  fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Поколения
                        </Box>

                    </Grid>
                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
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
                                disabled={
                                    groupProducts[element.id] === undefined
                                        ? element.productTypeId
                                            ? true
                                            : false
                                        : disabledProductId[element.id]
                                }
                                value={
                                    selectedGeneration[element.id] === "null"
                                        ? null
                                        : selectedGeneration[element.id] ||
                                        element.generation
                                }
                                onChange={(e) =>
                                    handleChangeGeneration(e, element.id)
                                }
                            >
                                <MenuItem
                                    value={null}
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    —
                                </MenuItem>

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

                <Grid container sx={{ height: '50px', color: 'black',  fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Доступ
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
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
                                disabled={
                                    groupProducts[element.id] === undefined
                                        ? element.productTypeId
                                            ? true
                                            : false
                                        : disabledProductId[element.id]
                                }
                                value={
                                    selectedAccessType[element.id] === "null"
                                        ? null
                                        : selectedAccessType[element.id] ||
                                        element.accessType
                                }
                                onChange={(e) =>
                                    handleChangeAccessType(e, element.id)
                                }
                            >
                                <MenuItem
                                    value={null}
                                    sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    —
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
                            </Select>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Начисление
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box>
                            <TextField
                                variant="standard"
                                sx={{
                                    width: "80px",
                                }}
                                value={
                                    accrual[element.id] ||
                                    (isFieldCleared[element.id]
                                        ? ""
                                        : element.commision)
                                }
                                onChange={(e) =>
                                    handleChangeAccrual(e, element.id)
                                }
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', borderBottom: '3px solid #005475', fontFamily: "'Montserrat', sans-serif" }}>
                                  <Box sx={{ color: '#005475' }} onClick={() =>
                                     deleteOld(
                                        element.commisionRecieverId,
                                        element.id
                                      )}>
                                    Удалить
                                    <IconButton>
                                      <img src={deleteGrey} alt="удалить" />
                                    </IconButton>
                                  </Box>
                                </Grid>
                </>
            ))}

        {newProducts?.map((item, index) => (
                <>
                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Группа товаров
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
                        <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",

                                      color: "#999999",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    value={groupProducts[item.id]}
                                    onChange={(e) =>
                                      handleChangeGroupProducts(e, item.id)
                                    }
                                    disabled={disabledProductTypeIdNew[item.id]}
                                  >
                                    <MenuItem
                                      value="null"
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
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

                                        color: "#999999",
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

                                        color: "#999999",
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

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Для персонала
                                    </MenuItem>
                                  </Select>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Товары
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box>
                        <Autocomplete
                                    multiple
                                    options={allProducts}
                                    disabled={disabledProductIdNew[item.id]}
                                    disableCloseOnSelect
                                    onChange={handleChangeNewProducts}
                                    getOptionLabel={(option) =>
                                      option.abbreviation
                                    }
                                    renderOption={(
                                      props,
                                      option,
                                      { selected }
                                    ) => (
                                      <li {...props}>
                                        <Checkbox
                                          icon={icon}
                                          checkedIcon={checkedIcon}
                                          style={{ marginRight: 8 }}
                                          checked={selected}
                                        />
                                        {option.abbreviation}
                                      </li>
                                    )}
                                    style={{ width: 150 }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Товары"
                                        variant="standard"
                                      />
                                    )}
                                  />
                        </Box>
                    </Grid>
                </Grid>


                <Grid container sx={{ height: '50px', color: 'black',  fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Поколения
                        </Box>

                    </Grid>
                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box sx={{ textAlign: "center" }}>
                        <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",

                                      color: "#999999",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    value={selectedGeneration[item.id]}
                                    onChange={(e) =>
                                      handleChangeGeneration(e, item.id)
                                    }
                                    disabled={disabledProductIdNew[item.id]}
                                  >
                                    <MenuItem
                                      value={null}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
                                    </MenuItem>
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

                <Grid container sx={{ height: '50px', color: 'black',  fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Доступ
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box>
                        <Select
                                    variant="standard"
                                    sx={{
                                      fontFamily: "Montserrat",
                                      fontSize: "16px",

                                      color: "#999999",
                                      textAlign: "center",
                                      cursor: "pointer",
                                      width: "150px",
                                    }}
                                    value={selectedAccessType[item.id]}
                                    onChange={(e) =>
                                      handleChangeAccessType(e, item.id)
                                    }
                                    disabled={disabledProductIdNew[item.id]}
                                  >
                                    <MenuItem
                                      value={null}
                                      sx={{
                                        fontFamily: "Montserrat",
                                        fontSize: "16px",

                                        color: "#999999",
                                        textAlign: "center",
                                        cursor: "pointer",
                                      }}
                                    >
                                      —
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
                                  </Select>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} >

                    <Grid container element xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                            Начисление
                        </Box>
                    </Grid>

                    <Grid container element xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Box>
                        <TextField
                                    variant="standard"
                                    sx={{
                                      width: "80px",
                                    }}
                                    value={
                                      accrual[item.id] ||
                                      (isFieldCleared[item.id]
                                        ? ""
                                        : item.commision)
                                    }
                                    onChange={(e) =>
                                      handleChangeAccrual(e, item.id)
                                    }
                                  />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ justifyContent: 'center', alignItems: 'center', borderBottom: '3px solid #005475', fontFamily: "'Montserrat', sans-serif" }}>
                                  <Box sx={{ color: '#005475' }} onClick={() => deleteNew(item.id)}>
                                    Удалить
                                    <IconButton>
                                      <img src={deleteGrey} alt="удалить" />
                                    </IconButton>
                                  </Box>
                                </Grid>
                </>
            ))}
            </Grid>
        </>
    )
}
