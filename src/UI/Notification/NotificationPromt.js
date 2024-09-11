import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from "react-router-dom";
import { main } from './script.js';

function NotificationPrompt({ onClose }) {
  const { accountId } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleEnableNotifications = () => {
    return checkSubscription(accountId).then(() => {
      if (isSubscribed) {
        return Promise.resolve(); // Возврат промиса, если пользователь уже подписан
      } else {
        return Promise.all([main(accountId), handleClose()]);
      }
    }).catch(error => {
      console.error('Произошла ошибка при проверке подписки:', error);
      return Promise.reject(error); // Возврат ошибки, если произошла ошибка
    });
  };


  const checkSubscription = async (accountId) => {
    console.log(`check подписки ${accountId}`);
    
    try {
      // const response = await fetch(`http://localhost:3001/api/${accountId}/check-subscription`,
      const response = await fetch(`https://24academy.ru/api/${accountId}/check-subscription`,
      {
        method: 'get',
        headers: { 'Content-type': "application/json" },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log(data.message)
      setIsSubscribed(data.message == 'Подписка успешно найдена'); 
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  useEffect(() => {
    checkSubscription(accountId);
  }, [checkSubscription, accountId]);

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{"Уведомления"}</DialogTitle>
      <DialogContent>
        <p>Вы хотели бы получать уведомления?</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", flexDirection: "column" }}>
        {isSubscribed ? (
          <p>Уведомления подключены</p>
        ) : (
          <Button onClick={handleEnableNotifications} variant="contained" sx={{ color: '#005475', fontFamily: "'Montserrat', sans-serif"}}>
            Включить
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default NotificationPrompt;
