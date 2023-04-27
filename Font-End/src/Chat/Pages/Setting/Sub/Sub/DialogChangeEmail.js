import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ChangeEmail, API_VerifyChangeEmail } from '../../../../../_APIs/system';
import { useSelector } from 'react-redux';
import { useContext, useRef, useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { UPDATE_USER } from '../../../../../_stores/Slices/user';
import { useDispatch } from 'react-redux';
import useErrorHandling from '../../../../../_methods/HandleError';
import { LanguageContext } from '../../../../../App';

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
    const { Language } = useContext(LanguageContext);

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
                {hasSent ? Language.Setting.Account.dialog_Email.headers_2 : Language.Setting.Account.dialog_Email.headers_1}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ padding: '.5rem' }}>
                    {
                        hasSent ?
                            <TextField
                                inputRef={verfiInput_ref}
                                label={Language.Setting.Account.dialog_Email.placeholder_2}
                                helperText={`${Language.Setting.Account.dialog_Email.input_helps_left}"${Email}${Language.Setting.Account.dialog_Email.input_helps_right}`}
                                onChange={(event) => setVerifyCode(event.target.value)}
                            />
                            :
                            <TextField
                                inputRef={emailInput_ref}
                                label={Language.Setting.Account.dialog_Email.placeholder_1}
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
                        <Button onClick={onClose}>{Language.Setting.Actions.cancel}</Button>
                        {
                            hasSent ?
                                <Button onClick={handleVerifyButtonClick}>{onClose}>{Language.Setting.Actions.apply}</Button>
                                :
                                <Button onClick={handleSendButtonClick}>{Language.Setting.Actions.send}</Button>

                        }
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DialogChangeEmail;
