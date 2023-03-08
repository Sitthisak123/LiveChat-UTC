import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import Headbar from './Component/Headbar.js';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Account() {
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
                    <p>{'<Undefined>'}</p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>ID</p>
                    <p>{'<Undefined>'}</p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Email Address</p>
                    <p>{'<Undefined>'}</p>
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Phone number</p>
                    <p>{'<Undefined>'}</p>
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
