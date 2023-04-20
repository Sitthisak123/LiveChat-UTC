import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { API_Init } from '../_APIs/admin';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { UPDATE_ADMIN, CREATE_ADMIN } from '../_stores/Slices/admin';
import Backdrop from '@mui/material/Backdrop';

const Auth = () => {
    const dispatch = useDispatch();
    const { admin_Store } = useSelector((state) => ({ ...state }));
    const Navigate = useNavigate();

    useEffect(() => {
            const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
            if (TOKEN) {
                dispatch(CREATE_ADMIN(TOKEN));

            }
            console.log('.............>>>');
            console.log(admin_Store);
            if (!localStorage.getItem("TOKEN")) {
                Navigate("/Login");
            } else {
                API_Init(admin_Store.admin_data.admin_TOKEN).post('', { /* request body */ }, { /* headers */ }).then(response => {
                    const data = response.data;
                    dispatch(UPDATE_ADMIN(data.admin_data))
                    Navigate("/Main");
                }).catch((error) => {
                    const data = error.response.data;
                    alert(data.text)
                    console.log(data);
                    localStorage.removeItem('TOKEN');
                    if (data.route) {
                        Navigate(data.route);
                    }
                    console.log(error);
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default Auth;