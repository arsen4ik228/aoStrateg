import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom";
import { main } from './script.js';
import { useState } from 'react';

function NotificationPrompt({ onClose }) {
  const { accountId } = useParams();

  const handleClose = () => {
    onClose();
  };

  const handleEnableNotifications = () => {
    main(accountId);
    handleClose();
  };



  return (
    <Dialog open={onClose? true : false} onClose={handleClose}>
      <DialogTitle>{"Уведомления"}</DialogTitle>
      <DialogContent>
        <p>Вы хотели бы получать уведомления?</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", flexDirection: "column" }}>
       
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button onClick={handleEnableNotifications} variant="contained"  sx={{ color: '#005475', fontFamily: "'Montserrat', sans-serif"}}>Включить</Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default NotificationPrompt;
