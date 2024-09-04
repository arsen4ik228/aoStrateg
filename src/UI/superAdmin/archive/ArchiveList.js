import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getArchive } from '../../../BLL/admin/archiveSlice';

const ArchiveList = () => {

    const dispatch = useDispatch();
    const { accountId } = useParams(); // Извлекаем accountId из URL
    useEffect(() => {
        dispatch(getArchive(accountId));
    }, [dispatch, accountId]); // Добавляем accountId в список зависимостей

    const archive = useSelector((state) => state.adminArchive.archive);


    return (
        <>
            <Box sx={{ flexGrow: 1, mt:'60px' }}>
                {archive.map((element) => (
                    element.id ? (
                        <Grid container sx={{ height: '90px', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }}>
                            <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ fontSize: '16px', fontWeight: '400', mr: '30px', ml: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: '#B4B4B4' }}>{element.orderNumber}</Box>
                            </Grid>

                            <Grid container item xs={3} sx={{ justifyContent: 'flex-start' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Box sx={{ fontSize: '16px', fontWeight: '600', color: '#B4B4B4' }}>{element.fullName}</Box>
                                    <Box sx={{ fontSize: '14px', fontWeight: '400', color: '#B4B4B4' }} >{element.organizationName}</Box>
                                    <Box sx={{ fontSize: '14px', fontWeight: '400', fontStyle: 'italic', color: '#B4B4B4' }}>{element.formattedDispatchDate}</Box>
                                </Box>
                            </Grid>

                            <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ fontSize: '16px', fontWeight: '600', color: '#B4B4B4' }}>{element.SUM} &#x20BD;</Box>
                            </Grid>

                            <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ fontSize: '16px', fontWeight: '600', color: '#B4B4B4' }}>{element.billNumber}</Box>
                            </Grid>
                        </Grid>
                    ) : null
                ))}
            </Box>

        </>
    )
}

export default ArchiveList;
