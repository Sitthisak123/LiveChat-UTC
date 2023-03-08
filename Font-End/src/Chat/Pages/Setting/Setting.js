import {
    StyledPageHeaders,
    StyledSettingIconButton,
    StyledOptionSection,
    StyledOptionSectionLogout,
    StyledDangerButton
} from "../../styles";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SmsIcon from '@mui/icons-material/Sms';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../../../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../../../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG } from '../../../_stores/Slices/chat_msg.js';
import { CREATE_FRIENDS_STATUS, UPDATE_FRIENDS_STATUS, DELETE_FRIENDS_STATUS, CLEAR_FRIENDS_STATUS } from '../../../_stores/Slices/Friends_Status';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";

function Settings() {
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const [isDialogOpen, setisDialogOpen] = useState(false);
    const { pathname } = useLocation();
    const {
        User_data,
        Chat_data_conversation,
        Chat_data_users,
        Chat_data_msg,
        Friends_relation,
    } = useSelector((state) => ({ ...state }));


    const OpionSettings = [
        {
            type: 0,
            icon: <ManageAccountsIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Account',
            action: () => navigate('Account'),
        },
        {
            type: 1,
            icon: <PeopleAltIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Friends',
            action: () => navigate('Friends'),
        },
        {
            icon: <SmsIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Chats',
            action: () => navigate('Chats'),
        },
        {
            icon: <LanguageIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Language',
            action: () => navigate('Language'),
        },
        {
            icon: <ColorLensIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Theme',
            action: () => navigate('Theme'),
        },

    ]
    const Optiontype = [
        "Personal info", 'General'
    ]
    const handleLogout = () => {
        dispacth(DELETE_USER());
        localStorage.clear();
        navigate('/Auth');
    }
    useEffect(() => console.log(pathname === '/Home/Settings'))
    if (pathname !== '/Home/Settings') {
        return (
            <>
                <Outlet />
            </>
        )
    }
    return (
        <>
            <StyledPageHeaders style={{ marginBottom: '.5rem' }}>
                <p>Settings</p>
            </StyledPageHeaders>
            {
                OpionSettings.map((option) => {
                    return <>
                        {option.type !== null && option.type !== undefined ? <StyledOptionSection>{Optiontype[option.type]}</StyledOptionSection> : ''}
                        <StyledSettingIconButton
                            disableRipple
                            onClick={() => option.action ? option.action() : null}
                        >
                            {option.icon}
                            <p style={{ marginLeft: '.5rem', width: '90%', fontSize: '1.2rem' }} >{option.text}</p>
                            <NavigateNextIcon sx={{ fontSize: '1.7rem' }} />
                        </StyledSettingIconButton>
                    </>
                })
            }
            <StyledOptionSectionLogout />
            <StyledSettingIconButton
                disableRipple sx={{
                    color: 'rgb(255,25,25)',
                    '&:hover': {
                        backgroundColor: 'rgba(255,0,0,.3)',
                    }
                }}
                onClick={() => setisDialogOpen(true)}
            >
                <LogoutIcon color="error" className="logouticon" sx={{ fontSize: '1.5rem' }}></LogoutIcon>
                <p style={{ marginLeft: '.5rem', width: '100%', fontSize: '1.2rem', color: 'red' }} >Logout</p>
            </StyledSettingIconButton>

            <Dialog
                open={isDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ minWidth: '220px' }}>
                    Logout
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        are You Sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <StyledDangerButton onClick={handleLogout}> Yes </StyledDangerButton>
                    <Button onClick={() => setisDialogOpen(false)} autoFocus> No </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Settings;
