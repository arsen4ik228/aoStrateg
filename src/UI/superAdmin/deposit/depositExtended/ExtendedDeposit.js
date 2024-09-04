import React from 'react'
import { Grid, Box } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDepositBalance } from '../../../../BLL/superAdmin/depositSuperAdminSlice'
const ExtendedDeposit = () => {

    const dispatch = useDispatch()
    const { accountId, organizationCustomerId } = useParams()

    useEffect(() => {
        dispatch(getDepositBalance({ accountId: accountId, organizationCustomerId: organizationCustomerId }))
    }, []);

    const depositsData = useSelector((state) => state.superAdminDeposits.orders)
    const city = useSelector((state) => state.superAdminDeposits.organization.organizationName)
    console.log(depositsData)

    return (
        <>
            <Box sx={{ position: "fixed",fontFamily: "'Montserrat', sans-serif", mt: '60px', height: '80px',top: 0, left: 0, bottom: 0, right: 0, width: '100%', }}>
            <Box sx={{ fontSize: '16px', fontWeight: '600', mb:'15px',mt:1,ml:'28px' }} >{city}</Box>
                <Grid container sx={{ height: '35px', borderBottom: '1px solid #B4B4B4', }} >
                    {/* Колонка 1 */}
                    
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ flexDirection: 'column' }}>
                            
                            <Box sx={{ fontSize: '16px', fontWeight: '400', mb: '11px' }}>
                                Дата
                            </Box>
                        </Box>
                    </Grid>

                    {/* Колонка 2 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mb: '11px' }}>Приход</Box>
                    </Grid>

                    {/* Колонка 3 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mb: '11px' }}>Расход</Box>
                    </Grid>

                    {/* Колонка 4 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Box sx={{ fontSize: '16px', fontWeight: '400', mb: '11px' }}>Остаток</Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ fontFamily: "'Montserrat', sans-serif", mt: '150px', width: '100%', }}>
            {depositsData.map((element)=> (
            <Grid key={element.id} container sx={{ height: '35px',fontFamily: "'Montserrat', sans-serif",}} >
                    {/* Колонка 1 */}
                    
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ flexDirection: 'column' }}>
                            
                            <Box sx={{ fontSize: '14px', fontWeight: '400', mb: '11px' }}>
                                {element.formattedDispatchDate}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Колонка 2 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ fontSize: '14px', fontWeight: '400', mb: '11px' }}>{element.Deposit}</Box>
                    </Grid>

                    {/* Колонка 3 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ fontSize: '14px', fontWeight: '400', mb: '11px' }}>{element.Spisanie}</Box>
                    </Grid>

                    {/* Колонка 4 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Box sx={{ fontSize: '14px', fontWeight: '400', mb: '11px' }}>{element.balance}</Box>
                    </Grid>
                </Grid>
                ))}
            </Box>
        </>
    )
}

export default ExtendedDeposit