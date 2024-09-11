import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import '@fontsource/montserrat'
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback } from "react";
import { useMemo } from "react";
import {
    getDeposit,
  } from "../../../BLL/superAdmin/depositSuperAdminSlice";

const ListDeposit = () => {

    const {accountId} = useParams()
    console.log(accountId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigation = (link) =>{
        navigate(link)
    };

 
  const depositsData = useSelector((state) => state.superAdminDeposits.deposits);
  
  const deposits = useMemo(() => {
    return depositsData; 
  }, [depositsData]);

  const sortDeposit = [...deposits].sort((a, b) => {
    if (a.organizationName > b.organizationName) {
      return 1;
    } else if (a.organizationName < b.organizationName) {
      return -1;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(getDeposit(accountId))
  }, [dispatch, accountId])
  
    return (
        <>
            <Grid sx={{height: '100%', weight: '100%', mt:'60px'}}>
            {sortDeposit.map((element) => (
            <Grid key={element.id} container sx={{ height: '50px', color: 'black', fontFamily: "'Montserrat', sans-serif" }} onClick={() => handleNavigation(element.id)} >

                <Grid container item xs={6} sx={{ justifyContent: 'flex-start', }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '600', ml: '50px' }}>
                            {element.organizationName}
                        </Box>
                        {/* <Box sx={{ fontSize: '12px', fontWeight: '400', ml: '50px' }} >{truncateString(element.organizationList.join(', '), 17)}</Box> */}
                    </Box>
                </Grid>

                <Grid container item xs={6} sx={{ justifyContent: 'flex-end', }}>
                    <Box sx={{ mr: '50px', mt: '2px', fontSize: '16px', fontWeight: '400',display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>{element.allDeposits - element.SUM}</Box>
                </Grid>
            </Grid>
            ))}
           </Grid> 
        </>
    )
}
export default ListDeposit;
