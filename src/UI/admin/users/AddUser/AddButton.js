import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUser, postAccount } from '../../../../BLL/admin/userSlice';
import '@fontsource/montserrat'
const AddButton = ({data}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accountId =useParams()

    const onButtonClick = () => {
        dispatch(
            postAccount({
              accountId: accountId,
              firstName: data.name,
              lastName: data.lastName,
              telephoneNumber: data.telephone,
              organizationList: data.selectedOrganizations,
            })
          ).then(() => {
            // dispatch(getUser(accountId));
            navigate(-1);
          });
    };

    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        // Initialize isValid as true
        let isValid = true;
    
        // Validate each field individually
        if (!/^([a-zA-Zа-яА-ЯёЁ]{2,})$/.test(data.name)) {
          isValid = false; // Set to false if name is invalid
        }
        if (!/^([a-zA-Zа-яА-ЯёЁ]{2,})$/.test(data.lastName)) {
          isValid = false; // Set to false if lastName is invalid
        }
        // Check if telephone is valid
        if (data.telephone.length !== 11 && data.telephone.length !== 12) {
          isValid = false; // Set to false if telephone is invalid
        }
        if (data.selectedOrganizations.length === 0){
            isValid = false; 
        }
        // Set form validity based on all fields' validity
        setIsFormValid(isValid);
        console.log(data.selectedOrganizations);
        console.log(`isFormValid ${isValid}`);
      };

        React.useEffect(() => {
            validateForm()
        }, [data.name, data.lastName, data.telephone, data.selectedOrganizations]);

    return (
        <Box sx={{ alignItems: 'flex-end' }}>
            <footer style={{
                position: 'fixed',
                zIndex: 1000,
                left: 0,
                bottom: 0,
                width: '100%',
                height: '108px',
                backgroundColor: 'white',
                color: '#005475', // Белый цвет текста для контраста
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // padding: '10px 20px', // Отступы внутри футера
                // boxSizing: 'border-box', // Учитывать внутренние отступы в ширину
                boxShadow: '0 -1px 1px rgba(0, 0, 0, 0.25)', // Эффект тени
            }}>
                <Button variant="contained" onClick={onButtonClick} disabled={!isFormValid} sx={{ height: '48px', weight: '300px', fontFamily: "'Montserrat', sans-serif", fontWeight: '700', fontSize: '18px', backgroundColor: '#005475', lineHeight: '22px' }}>
                    Сохранить
                </Button>

            </footer>
        </Box>
    );
};

export default AddButton;
