import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ForgotPassword } from '../../../../../_APIs/system';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

const DialogChangePassword = (props) => {
    const { onOpen, onClose } = props;
    const { User_data } = useSelector((state) => ({ ...state }));
    const [onLoad, setOnLoad] = useState(false);
    const [hasSend, setHasSend] = useState(false);

    const handleChangePassword = () => {
        setOnLoad(true);
        API_ForgotPassword().post('', { Email: User_data.value.user_email }).then((response) => {
            setOnLoad(false);
            setHasSend(true)
            alert(response.data.text);
        }).catch((error) => {
            setOnLoad(false);
            alert(error.response.data.text);
        });

    }
    return (
        <Dialog
            fullWidth={null}
            maxWidth={null}
            open={onOpen}
            onClose={onClose}
        >
            <DialogTitle sx={{ userSelect: 'none' }}>{hasSend? "Please check your inbox":"Change Password"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {
                        hasSend ?
                            "We have sent a link to your email. Please check your inbox"
                            :
                            "We will send a link to your email to reset your password. Please check your inbox"

                    }
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}
                >

                </Box>
            </DialogContent>
            <DialogActions>
                {
                    hasSend ?
                        <Button onClick={onClose}>OK</Button>
                        :
                        onLoad ?
                            <Fade
                                in={true}
                                style={{
                                    transitionDelay: '0ms'
                                }}
                                unmountOnExit
                            >
                                <CircularProgress color='secondary' size={20} />
                            </Fade>
                            :
                            <>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button onClick={handleChangePassword}>Send</Button>
                            </>
                }
            </DialogActions>
        </Dialog>

    )
}
export default DialogChangePassword;