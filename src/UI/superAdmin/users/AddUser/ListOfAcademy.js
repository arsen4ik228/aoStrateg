import React, {useState} from 'react'
import '@fontsource/montserrat'
import { Box, Grid, TextField, Checkbox, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    getEditUser,
    getAccount,
    getUser,
    postAccount,
  } from "../../../../BLL/superAdmin/usersSuperAdminSlice";
  
  const ListOfAcademy = ({ onSelectedOrganizations }) => {

    const accountId = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAccount({ accountId: accountId }))
    }, [accountId]);

    const organizationList = useSelector((state) => (state.superAdminUsers?.organizations || []));
    console.log(organizationList)

    const [selectedOrganizations, setSelectedOrganizations] = useState([]);

    useEffect(() => {
        onSelectedOrganizations(selectedOrganizations);
      }, [selectedOrganizations, onSelectedOrganizations]);

    return (
        <Grid container sx={{ height: 'calc(100vh - 320px)', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", top: 260, left: 0, bottom: 0, right: 0, weight: '100%', overflow: 'auto', position: 'fixed' }} >

            <Grid container item xs={6} sx={{ overflowY: "auto", }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', mt: '14px', color: '#005475' }}>
                        Академии
                    </Box>
                    <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }}></Box>
                </Box>
            </Grid>
            <Grid container item xs={6} sx={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '16px', fontWeight: '500', overflowY: "auto", }}>
                {organizationList.map((element) => (
                    <>
                        <Box key={element.id} sx={{ mt: '5px', }}>
                            <Checkbox
                                checked={selectedOrganizations.includes(element.organizationName)}
                                onChange={() => {
                                    if (selectedOrganizations.includes(element.organizationName)) {
                                        setSelectedOrganizations(selectedOrganizations.filter(org => org !== element.organizationName));
                                    } else {
                                        setSelectedOrganizations([...selectedOrganizations, element.organizationName]);
                                    }
                                }}
                            />
                            {element.organizationName}
                        </Box>
                    </>
                ))}
            </Grid>
        </Grid>
    )
}
export default ListOfAcademy