import Headbar from './Component/Headbar.js';
import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import CheckIcon from '@mui/icons-material/Check';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useContext } from 'react';
import { ThemeContext } from '../../../../App.js';
function Theme() {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <>
            <Headbar HeadName={'Theme'} />
            <div className='option'>
                <StyledSettingIconButton
                    disableRipple
                    sx={{ fontSize: '1.15rem' }}
                    onClick={() => setTheme('dark')}
                >
                    <div style={{ display: 'flex', gap: '.2rem' }}>
                        <NightlightIcon />
                        <p>Dark</p>
                    </div>
                    {theme === 'dark' ? <CheckIcon /> : ''}
                </StyledSettingIconButton>
                
                <StyledSettingIconButton
                    disableRipple
                    sx={{ fontSize: '1.15rem' }}
                    onClick={() => setTheme('light')}
                >
                    <div style={{ display: 'flex', gap: '.2rem' }}>
                        <WbSunnyIcon />
                        <p>Light</p>
                    </div>
                    {theme === 'light' ? <CheckIcon /> : ''}
                </StyledSettingIconButton>
            </div>
        </>
    )

}

export default Theme;
