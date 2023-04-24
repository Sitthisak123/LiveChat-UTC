import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import Headbar from './Component/Headbar.js';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DialogChangePassword from './Sub/DialogChangepass.js';
import DialogChangePhone from './Sub/DialogChangePhone.js.js';
import DialogConfigID  from './Sub/DialogConfigIDjs .js';
import DialogChangeEmail from './Sub/DialogChangeEmail.js';
function Account() {
    const { User_data } = useSelector((state) => ({ ...state }));
    const [dialogs, setDialogs] = useState({ psw: false, phone: false, ID: false ,Email: false});

    return (
        <>
            <Headbar HeadName={'Account'} />
            <div className='option'>
                <StyledOptionSection>General info</StyledOptionSection>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Username</p>
                    <p style={{ fontSize: '1rem' }}>
                        {User_data.value.user_username}
                    </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton onClick={() => setDialogs({ ...dialogs, ID: User_data.value.user_custom_id? false : true })} disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>ID</p>
                    <p style={{ fontSize: '1rem' }}>
                        {User_data.value.user_custom_id ? User_data.value.user_custom_id : '<Undefined>'}
                    </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton onClick={() => setDialogs({ ...dialogs, Email: true })} disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Email</p>
                    <p style={{ fontSize: '1rem' }}>
                        {User_data.value.user_email ? User_data.value.user_email : '<Undefined>'}
                        <NavigateNextIcon />
                    </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton onClick={() => setDialogs({ ...dialogs, phone: true })} disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Phone number</p>
                    <p style={{ fontSize: '1rem' }}>
                        {User_data.value.user_phone ? User_data.value.user_phone : '<Undefined>'}
                        <NavigateNextIcon />
                    </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton onClick={() => setDialogs({ ...dialogs, psw: true })} disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Password</p>
                    <NavigateNextIcon />
                </StyledSettingIconButton>
            </div>

            <DialogChangePassword onOpen={dialogs.psw}      onClose={() => setDialogs({ ...dialogs, psw: false })} />
            <DialogChangePhone    onOpen={dialogs.phone}    onClose={() => setDialogs({ ...dialogs, phone: false })} />
            <DialogConfigID       onOpen={dialogs.ID}       onClose={() => setDialogs({ ...dialogs, ID: false })} />
            <DialogChangeEmail    onOpen={dialogs.Email}    onClose={() => setDialogs({ ...dialogs, Email: false })} />

        </>
    )

}

export default Account;
