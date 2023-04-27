import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ForgotPassword } from '../../../../../_APIs/system';
import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { LanguageContext } from '../../../../../App';

const DialogChangePassword = (props) => {
    const { onOpen, onClose } = props;
    const { User_data } = useSelector((state) => ({ ...state }));
    const [onLoad, setOnLoad] = useState(false);
    const [hasSend, setHasSend] = useState(false);
    const { Language } = useContext(LanguageContext);

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
            <DialogTitle sx={{ userSelect: 'none' }}>{hasSend? Language.Setting.Account.dialog_ChangePSW.headers_2 : Language.Setting.Account.dialog_ChangePSW.headers_1}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {
                        hasSend ?
                        Language.Setting.Account.dialog_ChangePSW.info_2
                            :
                        Language.Setting.Account.dialog_ChangePSW.info_1

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
                        <Button onClick={onClose}>{Language.Setting.Actions.ok}</Button>
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
                                <Button onClick={onClose}>{Language.Setting.Actions.cancel}</Button>
                                <Button onClick={handleChangePassword}>{Language.Setting.Actions.send}</Button>
                            </>
                }
            </DialogActions>
        </Dialog>

    )
}
export default DialogChangePassword;