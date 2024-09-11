import React from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../BLL/admin/orderSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import '@fontsource/montserrat'

const Work = () => {

  const { accountId } = useParams();
  const dispatch = useDispatch();
  


  const navigate = useNavigate(); // Получаем функцию для навигации

  const handleNavigation = (link) => { //event
    // event.stopPropagation(); // Предотвращаем всплытие события
    navigate(`${link}`); // Переходим на новую страницу
  };

  useEffect(() => {
    dispatch(getOrder(accountId))
  }, [accountId]);

  const orders = useSelector((state) => state.adminOrder.orders);
  
  const [sortedOrders, setSortedOrders] = useState([...orders]);

  useEffect(() => {
    setSortedOrders(
      [...orders]?.sort((a, b) => {
        if (a.dispatchDate > b.dispatchDate) {
          return -1;
        } else if (a.dispatchDate < b.dispatchDate) {
          return 1;
        }
        return 0;
      })
    );
  }, [orders]);

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

        case "status":
          sortedData.sort((a, b) => {
            if (a.status < b.status) {
              return 1;
            } else if (a.status > b.status) {
              return -1;
            } 
              return 0;
            }
          );
          setSortedOrders(sortedData);
          break;
    }
  };



  return (



    // МОЖНО ПЕРЕДАВАТЬ ЗНАЧЕНИЯ КАК ЭЛЕМЕНТЫ МАСИВА ИЗ ВЫЗЫВАЮЩЕГО ФАЙЛА


    <Box sx={{ flexGrow: 1, fontFamily: "'Montserrat', sans-serif" , mt:'55px'}}>
      {sortedOrders.map((element) => (
        <Grid key={element.id} container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', color:
        dayjs(element.dispatchDate).format("DD-MM-YYYY") ==
        dayjs().format("DD-MM-YYYY")
          ? "black"
          : "#B4B4B4", }} >

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation(`${element.id}`)}>
            <Box sx={{ fontSize: '14px', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>№{element.orderNumber}</Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'flex-start' }} onClick={() => handleNavigation(`${element.id}`)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '14px', fontWeight: '600' }}>
                {element.fullName}
              </Box>
              <Box sx={{ fontSize: '12px', }} >{element.organizationName}</Box>
              <Box sx={{ fontSize: '12px',  fontStyle: 'italic' }}>{element.formattedDispatchDate}</Box>
            </Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => {sortNumber("status")}}>
            <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '12px',  }}>{element.status}</Box>
          </Grid>

          <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleNavigation(`${element.id}`)}>
          <Box sx={{ ml: '25px', textAlign: 'center', fontSize: '14px',  }}>{element.SUM}</Box>
          </Grid>
        </Grid>
      ))}
    </Box>



  );
};


export default Work;
