import Headbar from './Component/Headbar.js';
import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import CheckIcon from '@mui/icons-material/Check';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
function Theme() {
    return (
        <>
            <Headbar HeadName={'Theme'} />
            <div className='option'>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <div style={{ display: 'flex', gap: '.2rem' }}>
                        <NightlightIcon />
                        <p>Dark</p>
                    </div>
                    <CheckIcon />
                </StyledSettingIconButton>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.15rem' }}>
                    <div style={{ display: 'flex', gap: '.2rem' }}>
                        <WbSunnyIcon />
                        <p>Light</p>
                    </div>
                    <CheckIcon />
                </StyledSettingIconButton>
            </div>
        </>
    )

}

export default Theme;
