import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ConfigID } from '../../../../../_APIs/system';
import { useSelector } from 'react-redux';
import { useContext, useRef, useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { UPDATE_USER } from '../../../../../_stores/Slices/user';
import { useDispatch } from 'react-redux';
import useErrorHandling from '../../../../../_methods/HandleError';
import { LanguageContext } from '../../../../../App';

const DialogConfigID = (props) => {
    const { onOpen, onClose } = props;
    const { User_data } = useSelector((state) => ({ ...state }));
    const [onLoad, setOnLoad] = useState(false);
    const [customID, setCustomID] = useState(User_data.value.user_phone);
    const dispatch = useDispatch();
    const { handleErrors } = useErrorHandling();
    const { Language } = useContext(LanguageContext);
    
    const handleSendButtonClick = () => {

        setOnLoad(true);
        API_ConfigID(User_data.value.user_TOKEN).put('', { customID })
            .then((response) => {
                setOnLoad(false)
                dispatch(UPDATE_USER({ user_custom_id: customID }));
                console.log(response.data.text)
                onClose();
            })
            .catch((error) => {
                setOnLoad(false)
                handleErrors(error);
            })

    };

    return (
        <Dialog fullWidth={null} maxWidth={null} open={onOpen} onClose={onClose}>
            <DialogTitle sx={{ userSelect: 'none' }}>
                Config You ID
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ padding: '.5rem' }}>
                    <TextField
                        id="outlined-error-helper-text"
                        label={ Language.Setting.Account.id}
                        defaultValue={User_data.value.user_custom_id}
                        helperText={ Language.Setting.Account.dialog_ID.input_helps}
                        onChange={(event)=>setCustomID(event.target.value)}
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
                        <Button onClick={onClose}>{Language.Setting.Actions.cancel}</Button>
                        <Button onClick={handleSendButtonClick}>{Language.Setting.Actions.send}</Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfigID;
