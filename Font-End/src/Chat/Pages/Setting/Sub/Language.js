import Headbar from './Component/Headbar.js';
import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import CheckIcon from '@mui/icons-material/Check';
import { LanguageContext } from '../../../../App.js';
import { useContext } from 'react';
function Language() {
    const {lang,setLang, Language} = useContext(LanguageContext);
    return (
        <>
            <Headbar HeadName={'Language'} />
            <div className='option'>
                <StyledSettingIconButton onClick={()=>setLang("en")} disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>{Language.Setting.Language.english}</p>
                    {
                        lang === "en"?
                        <CheckIcon />:null

                    }
                </StyledSettingIconButton>
                <StyledSettingIconButton onClick={()=>setLang("th")} disableRipple sx={{ fontSize: '1.15rem' }}>
                    <p>{Language.Setting.Language.thai}</p>
                    {
                        lang === "th"?
                        <CheckIcon />:null

                    }
                </StyledSettingIconButton>
            </div>
        </>
    )

}

export default Language;
