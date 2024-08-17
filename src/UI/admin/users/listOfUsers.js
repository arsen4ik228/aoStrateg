import React, { useState } from 'react';
import '@fontsource/montserrat'
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUser } from '../../../BLL/admin/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ListOfUsers = () =>{

    const accountId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getUser({accountId: accountId}))
    },[accountId]);

    const listOfUsers = useSelector((state) => (state.adminUsers.users));
    console.log(listOfUsers);
   
    const handleNavigation = (link) =>{
        navigate(link)
    };

    const truncateString = (str, length) => str.length > length ? `${str.slice(0, length)}...` : str;

    return(
        <div style={{height:'calc(100vh - 50px)', weight:'100%', marginTop:'75px',}}>
      {listOfUsers.map((element) => (
        <Grid key={element.id} container sx={{ height: '36px', color:'black',mt:4,mb:1, fontFamily: "'Montserrat', sans-serif" }} onClick={() => handleNavigation(element.id)} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '14px', fontWeight: '500', ml:'50px' }}>
                {element.firstName+' '+element.lastName}
              </Box>
              <Box sx={{ fontSize: '12px', fontWeight: '400',ml:'50px' }} >{truncateString(element.organizationList.join(', '), 17)}</Box>
            </Box>
          </Grid>

          <Grid container item xs={6} sx={{ justifyContent: 'flex-end', alignItems: 'flex-start', }}>
           <Box sx={{mr:'25px', mt:'2px', fontSize: '14px', fontWeight: '400'}}>{element.formattedLastSeen}</Box>
          </Grid>
        </Grid>
      ))}
    
    </div>

    );

}

    export default ListOfUsers;