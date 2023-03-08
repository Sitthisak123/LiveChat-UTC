import Headbar from './Component/Headbar.js';
import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import CheckIcon from '@mui/icons-material/Check';
function Language() {
    return (
        <>
            <Headbar HeadName={'Language'} />
            <div className='option'>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>English</p>
                    <CheckIcon />
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>Thai</p>
                </StyledSettingIconButton>
            </div>
        </>
    )

}

export default Language;
