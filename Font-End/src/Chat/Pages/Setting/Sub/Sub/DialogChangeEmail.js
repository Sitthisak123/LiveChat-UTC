import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ChangeEmail, API_VerifyChangeEmail } from '../../../../../_APIs/system';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { UPDATE_USER } from '../../../../../_stores/Slices/user';
import { useDispatch } from 'react-redux';
import useErrorHandling from '../../../../../_methods/HandleError';

const DialogChangeEmail = (props) => {
    const { onOpen, onClose } = props;
    const { User_data } = useSelector((state) => ({ ...state }));
    const [onLoad, setOnLoad] = useState(false);
    const [Email, setEmail] = useState(User_data.value.user_email);
    const dispatch = useDispatch();
    const [hasSent, setHasSent] = useState(false);
    const { handleErrors } = useErrorHandling();
    const [verifyCode, setVerifyCode] = useState('');
    const emailInput_ref = useRef();
    const verfiInput_ref = useRef();
    const handleSendButtonClick = () => {
        setOnLoad(true);
        API_ChangeEmail(User_data.value.user_TOKEN).put('', { newEmail: Email })
            .then((response) => {
                emailInput_ref.current.value = ''
                setOnLoad(false);
                setHasSent(true);

                console.log(response.data.text)
            })
            .catch((error) => {
                emailInput_ref.current.focus();
                setOnLoad(false)
                handleErrors(error);
            })

    };
    const handleVerifyButtonClick = () => {
        setOnLoad(true);
        API_VerifyChangeEmail(User_data.value.user_TOKEN).put('', { verificationCode: verifyCode })
            .then((response) => {
                setOnLoad(false);
                setHasSent(false);
                dispatch(UPDATE_USER({ user_email: Email }));
                console.log(response.data.text)
                onClose();
            })
            .catch((error) => {
                verfiInput_ref.current.focus();
                setOnLoad(false)
                handleErrors(error);
            })

    };

    return (
        <Dialog fullWidth={null} maxWidth={null} open={onOpen} onClose={null}>
            <DialogTitle sx={{ userSelect: 'none' }}>
                {hasSent ? "Verify new Email" : "Change Email"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ padding: '.5rem' }}>
                    {
                        hasSent ?
                            <TextField
                                inputRef={verfiInput_ref}
                                label="Your verification COde"
                                helperText={`check your inbox: "${Email}", code Will Expire in 5minute`}
                                onChange={(event) => setVerifyCode(event.target.value)}
                            />
                            :
                            <TextField
                                inputRef={emailInput_ref}
                                label="Your new Email"
                                helperText={""}
                                onChange={(event) => setEmail(event.target.value)}
                            />
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
                ></Box>
            </DialogContent>
            <DialogActions>
                {onLoad ? (
                    <Fade in={true} style={{ transitionDelay: '0ms' }} unmountOnExit>
                        <CircularProgress color="secondary" size={20} />
                    </Fade>
                ) : (
                    <>
                        <Button onClick={onClose}>Cancel</Button>
                        {
                            hasSent ?
                                <Button onClick={handleVerifyButtonClick}>Apply</Button>
                                :
                                <Button onClick={handleSendButtonClick}>Send</Button>

                        }
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DialogChangeEmail;
