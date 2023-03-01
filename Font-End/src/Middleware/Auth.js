import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../_stores/Slices/user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG } from '../_stores/Slices/chat_msg.js';
import { API_Init } from '../_APIs/user';
import { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react';

import Backdrop from '@mui/material/Backdrop';

const Auth = () => {
    const dispatch = useDispatch();
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
    const Navigate = useNavigate();
    const [hasRun, sethasRun] = useState(false);
    const user = JSON.parse(localStorage.getItem('TOKEN'));

    useEffect(() => {
        if (!hasRun) {
            sethasRun(true);
            if (!localStorage.getItem("TOKEN") || User_data.value.length < 1) {
                Navigate("/Login");
            } else {
                API_Init(User_data.value.user_TOKEN).post('', { /* request body */ }, { /* headers */ }).then(response => {
                    console.log(response.data);
                    dispatch(CREATE_CONVERSATION(response.data.conversation));
                    dispatch(CREATE_CHAT_USERS(response.data.users));
                    dispatch(CREATE_CHAT_MSG(response.data.chat_msg));
                    dispatch(UPDATE_USER(response.data.user));
                    Navigate("/Home");

                }).catch((error) => {
                        const data = error.response.data;
                        alert(data.text)
                        console.log(data);

                        localStorage.removeItem('TOKEN');
                        dispatch(DELETE_USER())
                        dispatch(CLEAR_CONVERSATION())
                        dispatch(CLEAR_CHAT_USERS())
                        dispatch(CLEAR_CHAT_MSG())
                        dispatch(DELETE_USER());
                        if (data.route) {
                            Navigate(data.route);
                        }
                        console.log(error);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        // <Box sx={{ display: 'flex' }}>
        //     <CircularProgress />
        // </Box>
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
export default Auth;