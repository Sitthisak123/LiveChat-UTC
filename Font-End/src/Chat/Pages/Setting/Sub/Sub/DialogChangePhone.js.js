import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ChangePhoneNum, API_ForgotPassword } from '../../../../../_APIs/system';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { UPDATE_USER } from '../../../../../_stores/Slices/user';
import { useDispatch } from 'react-redux';
import useErrorHandling from '../../../../../_methods/HandleError';
const DialogChangePhone = (props) => {
    const { onOpen, onClose } = props;
    const { User_data } = useSelector((state) => ({ ...state }));
    const [onLoad, setOnLoad] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const inputPhoneNum = useRef();
    const dispatch = useDispatch();
    const { handleErrors } = useErrorHandling();
    const validatePhoneNumber = (value) => {
        const regex = /^[0][1-9]\d{8,8}$/;
        return regex.test(value);
    };

    const handleChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handleSendButtonClick = () => {
        if (validatePhoneNumber(phoneNumber)) {
            setOnLoad(true);
            API_ChangePhoneNum(User_data.value.user_TOKEN).put('', { newPhone: phoneNumber })
                .then((response) => {
                    setOnLoad(false)
                    console.log(response.data.text)
                    dispatch(UPDATE_USER({ user_phone: phoneNumber }));
                    onClose();
                })
                .catch((error) => {
                    setOnLoad(false)
                    handleErrors(error);
                })

        } else {
            inputPhoneNum.current.focus();
        }
    };

    return (
        <Dialog fullWidth={null} maxWidth={null} open={onOpen} onClose={onClose}>
            <DialogTitle sx={{ userSelect: 'none' }}>
                {User_data.value.user_phone
                    ? 'Change Phone Number'
                    : 'Bind Your Phone Number'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ padding: '.5rem' }}>
                    <TextField
                        id="outlined-error-helper-text"
                        label="Number Phone"
                        defaultValue={User_data.value.user_phone}
                        helperText={validatePhoneNumber(phoneNumber) ? '' : "Please enter a valid phone number."}
                        inputRef={inputPhoneNum}
                        onChange={handleChangePhoneNumber}
                        error={!validatePhoneNumber(phoneNumber)}
                    />
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
                        <Button onClick={handleSendButtonClick}>Change</Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DialogChangePhone;
