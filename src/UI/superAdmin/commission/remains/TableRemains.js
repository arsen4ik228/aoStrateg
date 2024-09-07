import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box } from '@mui/material'
import { getBalance } from '../../../../BLL/superAdmin/comissionSlice'

const TableRemains = ({dummyKey}) => {

    const dispatch=useDispatch()
    const {accountId, commisionRecieverId} = useParams()

    useEffect(()=>{
        dispatch(getBalance({accountId: accountId, commisionRecieverId: commisionRecieverId})).then(nameOrg)
    },[accountId,commisionRecieverId, dummyKey])

    const operations = useSelector(
        (state) => state.superAdminCommision?.operations
      );
      const commision = useSelector(
        (state) => state.superAdminCommision?.commision
      );

      const nameOrg = () => {
        const commisionReciever = commision.find(item => item.id === commisionRecieverId);
        return commisionReciever ? commisionReciever.name : null;
      };
      const orgName = nameOrg()
    
    console.log(orgName)

  return (
    <>
    <Box sx={{ position: "fixed",fontFamily: "'Montserrat', sans-serif", mt: '60px', height: '80px',top: 0, left: 0, bottom: 0, right: 0, width: '100%', }}>
            <Box sx={{ fontSize: '16px', fontWeight: '600', mb:'15px',mt:1,ml:'28px' }} >{orgName}</Box>
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

            <Box sx={{ fontFamily: "'Montserrat', sans-serif", mt: '150px', width: '100%', position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: 'calc(100vh-100px', overflow:'auto'}}>
            {operations.map((element)=> (
            <Grid key={element.id} container sx={{ height: '35px',fontFamily: "'Montserrat', sans-serif",}} >
                    {/* Колонка 1 */}
                    
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ flexDirection: 'column' }}>
                            
                            <Box sx={{ fontSize: '14px', fontWeight: '400', mb: '11px' }}>
                                {element.formattedDate}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Колонка 2 */}
                    <Grid container item xs={3} sx={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                        <Box sx={{ fontSize: '14px', fontWeight: '400', mb: '11px' }}>{element.Postyplenie}</Box>
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

export default TableRemains