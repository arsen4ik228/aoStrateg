import React, { useState } from 'react'
import '@fontsource/montserrat'
import { Box, Grid, TextField, Checkbox, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getEditUser} from '../../../../BLL/superAdmin/usersSuperAdminSlice'
const ListOfAcademy = ({ onSelectedOrganizations }) => {

    const { accountId, accountFocusId } = useParams();
    const dispatch = useDispatch();


    const [selectedOrganizations, setSelectedOrganizations] = useState([]);


    useEffect(() => {
        dispatch(getEditUser({ acccountId: accountId, accountFocusId: accountFocusId }));
    }, [accountId, dispatch])

    const accountData = useSelector((state) => (state.superAdminUsers?.editAccount || []));
    const listOfOrganizations = useSelector((state) => (state.superAdminUsers?.editOrganizations || []));

    useEffect(() => {
        if (accountData && accountData.organizationList) {
            setSelectedOrganizations(accountData.organizationList);
        }
    }, [accountId, dispatch, accountData]);

    useEffect(() => {
        onSelectedOrganizations(selectedOrganizations);
    }, [accountId, dispatch, accountData, selectedOrganizations]);

    // Сортировка организаций так, чтобы отмеченные шли первыми
    const sortedOrganizations = [...listOfOrganizations].sort((a, b) => {
        const isSelectedA = selectedOrganizations.includes(a.organizationName);
        const isSelectedB = selectedOrganizations.includes(b.organizationName);
        return isSelectedB - isSelectedA; // Организации, отмеченные чекбоксом, идут первыми
    });

    return (
        <Grid container sx={{ height: 'calc(100vh - 370px)', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", top: 310, left: 0, bottom: 0, right: 0, weight: '100%', overflow: 'auto', position: 'fixed' }} >

            <Grid container item xs={6} sx={{ overflowY: "auto", }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', mt: '14px', color: '#005475' }}>
                        Академии
                    </Box>
                    <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }}></Box>
                </Box>
            </Grid>
            <Grid container item xs={6} sx={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', fontSize: '16px', fontWeight: '500', overflowY: "auto", }}>
                {sortedOrganizations.map((element) => (
                    <Box key={element.organizationName} sx={{ mt: '5px' }}>
                        <Checkbox
                            checked={selectedOrganizations.includes(element.organizationName)}
                            onChange={() => {
                                const newSelectedOrganizations = selectedOrganizations.includes(element.organizationName)
                                    ? selectedOrganizations.filter(org => org !== element.organizationName)
                                    : [...selectedOrganizations, element.organizationName];
                                setSelectedOrganizations(newSelectedOrganizations);
                            }}
                        />
                        {element.organizationName}
                    </Box>
                ))}
            </Grid>
        </Grid>
    )
}
export default ListOfAcademy