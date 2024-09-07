import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Modal,
} from "@mui/material";
import { incrementDummyKey, postCommision } from "../../../BLL/superAdmin/comissionSlice";
// import CircularProgressCustom from "../../styledComponents/CircularProgress";
// import ErrorHandler from "../../../Custom/ErrorHandler";

export default function Add({ isOpen, close }) {
  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL
  const [loadingSave, setLoadingSave] = useState(false); 
  const [text, setText] = useState(); 
  const errorPostCommision = useSelector((state) => state.superAdminCommision?.errorPostCommision);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSave = () => {
    setLoadingSave(true);
    console.log(text);
    dispatch(postCommision({accountId, commisionRecieverName: text })).then(() => {
      setText('');
      close(false);
      dispatch(incrementDummyKey()); 
      setLoadingSave(false);
      setSnackbarOpen(true);
    }, () => { setSnackbarOpen(true);  setLoadingSave(false);});
  };

  const resetStates = () => { 
    setText('');
  };
  const changeText = (event) => {
    setText(event.target.value);
  };



  return (
    <div>
      {loadingSave
        ? (
          <>
       </>
        ) : ( <Dialog
        open={isOpen}
        onClose={() => close(false)}
        hideBackdrop // Добавлено свойство для улучшения доступности
        sx={{ marginBottom: "calc(100vh - 350px)",}} //"calc(100vw - 130%)"
      >
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#005475",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Новый получатель комиссии
          </DialogContentText>
          <hr  style={{ borderTopWidth: '2px', color: '#005475' }}/>
          <TextField
            placeholder="Введите название нового получателя"
            variant="standard"
            sx={{
              width: '300px',
              // '.MuiInputBase-input.Mui-disabled': {
              //   transform: 'skewX(-20deg)',
              //   translate: 'translateY(-4px)',
              // },
            }}
          value={text}
          onChange={changeText}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={(enent) => handleSave(enent)}
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
        </DialogActions>
      </Dialog>)
      }

{/* <ErrorHandler
        error={errorPostCommision}
        snackbarOpen={snackbarOpen}
        close={setSnackbarOpen}
        text={"ПОлучателькомисси создан"}
      ></ErrorHandler> */}
    </div>
  );
}
