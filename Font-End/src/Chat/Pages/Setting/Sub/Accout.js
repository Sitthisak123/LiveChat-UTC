import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import Headbar from './Component/Headbar.js';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector } from 'react-redux';
import { fontSize } from '@mui/system';
function Account() {
    const {User_data} = useSelector((state)=> ({...state}));
    const OpionSettings = [
        {},
        {}
    ]
    return (
        <>
            <Headbar HeadName={'Account'} />
            <div className='option'>
                <StyledOptionSection>General info</StyledOptionSection>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Username</p>
                    <p style={{fontSize: '1rem'}}>
                        {User_data.value.user_username}
                        </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>ID</p>
                    <p style={{fontSize: '1rem'}}>
                        {User_data.value.user_custom_id? User_data.value.user_custom_id:'<Undefined>'}
                        </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Email</p>
                    <p style={{fontSize: '1rem'}}>
                        {User_data.value.user_email? User_data.value.user_email:'<Undefined>'}
                        </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Phone number</p>
                    <p style={{fontSize: '1rem'}}>
                        {User_data.value.user_phone? User_data.value.user_phone:'<Undefined>'}
                    </p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Password</p>
                    <NavigateNextIcon />
                </StyledSettingIconButton>
            </div>
        </>
    )

}

export default Account;
