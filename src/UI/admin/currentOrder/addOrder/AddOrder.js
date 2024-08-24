import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, Box, Checkbox, Select, MenuItem, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getNewOrder } from '../../../../BLL/admin/orderSlice'
import { useParams } from 'react-router-dom';

const AddOrder = () => {

  const dispatch = useDispatch()
  const accountId = useParams();
  React.useEffect(() => {
    dispatch(getNewOrder(accountId))

  }, [])

  const allProducts = useSelector((state) => state.adminOrder?.allProducts);
  const allOrganizations = useSelector(
    (state) => state.adminOrder?.allOrganizations
  );
  console.log(allOrganizations)
  const allPayees = useSelector((state) => state.adminOrder?.allPayees);

  return (
    <>
      <Grid sx={{ position: 'fixed', top: 55, left: 0, bottom: 0, right: 0, width: '100%', height: '150px', zIndex: 1000 }}>
        <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif" }} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start', alignItems: 'center' }} >
            <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
              Академия
            </Box>
          </Grid>
          
          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ fontSize: '16px', justifyContent: 'center', alignItems: 'center', mt: '10px' }}>
              <Select
                variant="standard"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  color: "black",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "150px",
                }}>
                {allOrganizations.map((organization) => (
                  <MenuItem key={organization.organizationName} value={organization.organizationName}>
                    {organization.organizationName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                Получатель
              </Box>
              <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
            </Box>
          </Grid>
          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ fontSize: '14px', mt: '10px' }}>
              <Select
                variant="standard"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  color: "black",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "150px",
                }}>
                {allPayees.map((organization) => (
                  <MenuItem key={organization.name} value={organization.name}>
                    {organization.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                Состояние
              </Box>
              <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
            </Box>
          </Grid>
          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
              <Select
                variant="standard"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  color: "black",
                  textAlign: "center",
                  cursor: "pointer",
                  width: "150px",
                }}>
                {allOrganizations.map((organization) => (
                  <MenuItem key={organization.organizationName} value={organization.organizationName}>
                    {organization.organizationName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                № Счёта
              </Box>
              <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
            </Box>
          </Grid>
          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ fontSize: '14px', justifyContent: 'center', alignItems: 'flex-start', mt: '10px' }}>
              <TextField id="standard-basic" variant="standard" size="small" sx={{ fontFamily: "'Montserrat', sans-serif", }} />

            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ height: '50px', color: 'black', borderBottom: '1px solid #B4B4B4', fontFamily: "'Montserrat', sans-serif", }} >

          <Grid container item xs={6} sx={{ justifyContent: 'flex-start' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '18px', fontWeight: '500', ml: '25px', color: '#005475' }}>
                С депозита
              </Box>
              <Box sx={{ fontSize: '14px', fontWeight: '400', ml: '25px' }} ></Box>
            </Box>
          </Grid>
          <Grid container item xs={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: '400' }}>
              <Checkbox />
            </Box>
          </Grid>
        </Grid>

      </Grid>
    </>
  )
}
export default AddOrder
