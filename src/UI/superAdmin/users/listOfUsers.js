import React, { useState } from 'react';
import '@fontsource/montserrat'
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getEditUser,
  getAccount,
  getUser,
  postAccount,
} from '../../../BLL/superAdmin/usersSuperAdminSlice.js'

const ListOfUsers = () => {

  // const accountId = useParams();
  // const dispatch = useDispatch();
  const navigate = useNavigate()

  // useEffect(()=>{
  //     dispatch(getUser({accountId: accountId}))
  // },[accountId]);

  // const listOfUsers = useSelector((state) => (state.adminUsers.users));
  // console.log(listOfUsers);

  const handleNavigation = (link) => {
    navigate(link)
  };

  const truncateString = (str, length) => str.length > length ? `${str.slice(0, length)}...` : str;

  const dispatch = useDispatch();
  const { accountId } = useParams(); // Извлекаем accountId из URL

  const users = useSelector((state) => state.superAdminUsers?.users || []);
  const organizations = useSelector((state) => state.superAdminUsers?.organizations);
  console.log(users)
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState();
  const [isFormValid, setIsFormValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [openStates, setOpenStates] = useState({});
  const [dummyKey, setDummyKey] = useState(0);


  const [sortedUsers, setSortedUsers] = useState([...users]);
  useEffect(() => {
    setSortedUsers([...users]);
  }, [users])


  useEffect(() => {
    dispatch(getUser(accountId))
  }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

  useEffect(() => {
    setSelectedOptions(organizations);
  }, [organizations]); // Добавляем accountId в список зависимостей

  // Добавьте useEffect для наблюдения за изменениями в telephone


  const sortNumber = (name) => {
    const sortedData = [...sortedUsers];
    switch (name) {
      case "Number":
        sortedData.sort((a, b) => {
          if (a.accountNumber > b.accountNumber) {
            return 1;
          } else if (a.accountNumber < b.accountNumber) {
            return -1;
          }
          return 0;
        });
        setSortedUsers(sortedData);
        break;

      case "fullName":
        sortedData.sort((a, b) => {
          if (a.firstName > b.firstName) {
            return 1;
          } else if (a.firstName < b.firstName) {
            return -1;
          }
          return 0;
        });
        setSortedUsers(sortedData);
        break;

      case "organizationName":
        sortedData.sort((a, b) => {
          if (a.organizationList[0] > b.organizationList[0]) {
            return 1;
          } else if (a.organizationList[0] < b.organizationList[0]) {
            return -1;
          }
          return 0;
        });
        setSortedUsers(sortedData);
        break;
    }
  };

  return (
    <>
      <Grid sx={{ height: '100%', weight: '100%', mt: '70px' }}>
        {sortedUsers.map((element) => (
          <Grid key={element.id} container sx={{ height: '36px', color: 'black', mt: 4, mb: 1, fontFamily: "'Montserrat', sans-serif" }} onClick={() => handleNavigation(element.id)} >

            <Grid container item xs={6} sx={{ justifyContent: 'flex-start', }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Box sx={{ fontSize: '14px', fontWeight: '500', ml: '50px' }}>
                  {element.firstName + ' ' + element.lastName}
                </Box>
                <Box sx={{ fontSize: '12px', fontWeight: '400', ml: '50px' }} >
                  {element.organizationList.slice(0, 3).map((org, index) => (
                    <span key={index}>{truncateString(org, 15)},</span>
                  ))}
                  {element.organizationList.length > 3 && (
                    <span>...</span>
                  )}
                </Box>


              </Box>
            </Grid>

            <Grid container item xs={6} sx={{ justifyContent: 'flex-end', alignItems: 'flex-start', }}>
              <Box sx={{ mr: '25px', mt: '2px', fontSize: '14px', fontWeight: '400' }}>{element.formattedLastSeen}</Box>
            </Grid>
          </Grid>
        ))}

      </Grid>
    </>
  );

}

export default ListOfUsers;