import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import MenuIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import MenuBar from '../Menu/MenuBar';
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
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { AppBar, Toolbar, Typography, SwipeableDrawer, Badge } from '@mui/material';

import { styled } from "@mui/system";
import plus from "./image/add.svg";
import Add from "./Add.jsx";
// import ModalRules from "./ModalRules.jsx";
// import ModalRemains from "./remains/ModalRemains.jsx";
import {
  getBalance,
  getComission,
  getRules,
} from "../../../BLL/superAdmin/comissionSlice.js"
// import { getDepositBalance } from "../../../../BLL/superAdmin/depositSuperAdminSlice.js";
// import CircularProgressCustom from "../../styledComponents/CircularProgress.jsx";

// Создаем стилизованные компоненты с помощью styled
const StyledTableCellHead = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Montserrat"',
  fontSize: "14px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475BF",
  textAlign: "center",
  paddingY: 1,
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "#fff",
}));

// Text Header
const TextHeader = styled(TableCell)({
  fontFamily: "Montserrat",
  fontSize: "16px",
  fontWeight: 600,
  color: "#005475",
  borderBottom: "3px solid #005475",
  textAlign: "center",
});
export default function Commission() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [openDialog, setOpenDialog] = useState(false);
  const [openStates, setOpenStates] = useState({});
  const [openStatesRemains, setOpenStatesRemains] = useState({});
  const [modal, setModal] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRules, setIsLoadingRules] = useState();
  const [isLoadingRemains, setIsLoadingRemains] = useState();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const commision = useSelector(
    (state) => state.superAdminCommision?.commision
  );
  const dummyKey = useSelector((state) => state.superAdminCommision?.dummyKey);

  useEffect(() => {
    dispatch(getComission(accountId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, accountId, dummyKey]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    // Find the first open modal
    let openModalId = Object.keys(openStates).find((id) => openStates[id]);
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId

      dispatch(
        getRules({ accountId: accountId, commisionRecieverId: openModalId })
      ).then(() => setIsLoadingRules(false));
    }
  }, [openStates, dispatch, dummyKey]);

  useEffect(() => {
    // Find the first open modal
    let openModalId = Object.keys(openStatesRemains).find(
      (id) => openStatesRemains[id]
    );
    if (openModalId) {
      // Assuming you have the accountId available, replace "1" with the actual accountId
      dispatch(
        getBalance({ accountId: accountId, commisionRecieverId: openModalId })
      ).then(() => setIsLoadingRemains(false));
    }
  }, [openStatesRemains, dispatch, dummyKey]);

  const OpenModalRules = (id) => {
    // setIsLoadingRules(true);
    // setModal("rules");
    // return setOpenStates({ ...openStates, [id]: true });
    navigate(`rules/${id}`)
  };

  const handleCloseModalRules = (id) => {
    setOpenStates({ ...openStates, [id]: false });
  };

  const OpenModalRemains = (id) => {
    // setIsLoadingRemains(true);
    // setModal("remains");
    // return setOpenStatesRemains({ ...openStatesRemains, [id]: true });
    navigate(id)
  };

  const handleCloseModalRemains = (id) =>
    setOpenStatesRemains({ ...openStatesRemains, [id]: false });


  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  return (
    <>
       <div style={{position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '50px', }}>
      <AppBar position="static" sx={{ backgroundColor: 'white'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#005475', fontSize: '18px', fontWeight: '500',fontFamily: "'Montserrat', sans-serif" }}>
            Кoмиссионные
          </Typography>
          <IconButton edge="end" aria-label="menu" sx={{ color: '#005475', mr:'1px', fontSize: 'large' }} onClick={() => handleOpenDialog()}>
              <AddIcon />
          </IconButton>
          
          <IconButton edge="end" aria-label="menu" sx={{ color: '#005475' }} onClick={toggleDrawer}>
              <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MenuBar toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
    </div>
        
      <div style={{position: 'fixed', top: 60, left: 0, bottom: 0, right: 0, width: '100%', justifyContent:'center', alignItems:'center' }}>

        
        {isLoading ? (
          <> </>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              height: "calc(100vh - 60px)",
              overflow: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#005475BF #FFFFFF",
            }}
          >
            <Table stickyHeader sx={{ width: "90%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCellHead
                    sx={{
                      paddingY: 1,
                      position: "sticky",
                      top: 0,
                      zIndex: 100,
                      background: "#fff",
                    }}
                  >
                    Получатель
                  </StyledTableCellHead>
                  <StyledTableCellHead
                    sx={{
                      paddingY: 1,
                      position: "sticky",
                      top: 0,
                      zIndex: 100,
                      background: "#fff",
                    }}
                  >
                    Правила начисления
                  </StyledTableCellHead>
                  <StyledTableCellHead
                    sx={{
                      paddingY: 1,
                      position: "sticky",
                      top: 0,
                      zIndex: 100,
                      background: "#fff",
                    }}
                  >
                    Остаток
                  </StyledTableCellHead>
                  {/* <StyledTableCellHead
                  sx={{
                    paddingY: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    background: "#fff",
                  }}
                >
                  <IconButton onClick={() => handleOpenDialog()}>
                    <img src={plus} alt="плюс" />
                  </IconButton>
                </StyledTableCellHead> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {commision?.map((element) => (
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",

                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {element.name}
                    </TableCell>

                    <TableCell
                      onClick={() => OpenModalRules(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",

                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {element.rulesQuantity}
                    </TableCell>

                    <TableCell
                      onClick={() => OpenModalRemains(element.id)}
                      sx={{
                        fontFamily: "Montserrat",
                        fontSize: "16px",

                        color: "black",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {element.balance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Add isOpen={openDialog} close={setOpenDialog}></Add>

        {/* <ModalRules
          isLoadingRules={isLoadingRules}
          openStates={openStates}
          close={handleCloseModalRules}
          commision={commision}
        ></ModalRules> */}

        {/* <ModalRemains
          isLoadingRemains={isLoadingRemains}
          openStates={openStatesRemains}
          close={handleCloseModalRemains}
          commision={commision}
        ></ModalRemains> */}
      </div>
    </>
  );
}
