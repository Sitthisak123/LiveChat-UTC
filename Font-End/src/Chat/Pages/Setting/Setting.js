import { StyledPageHeaders, StyledIconButton, StyledOptionSection, StyledOptionSectionLogout} from "../../styles";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LogoutIcon from '@mui/icons-material/Logout';



function Settings() {
    const OpionSettings = [
        {
            icon: <ManageAccountsIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Account',
            type: 0,
        },
        {
            icon: <PeopleAltIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Friends',
            type: 1,
        },
        {
            icon: <ColorLensIcon sx={{ fontSize: '1.5rem' }} />,
            text: 'Theme',
        },

    ]
    const Optiontype = [
        "Personal info", 'General'
    ]

    return (
        <div>
            <StyledPageHeaders style={{ marginBottom: '.5rem' }}>
                <p>Settings</p>
            </StyledPageHeaders>
            {
                OpionSettings.map((option) => {
                    return <>
                        {option.type !== null && option.type !== undefined ? <StyledOptionSection>{Optiontype[option.type]}</StyledOptionSection> : ''}
                        <StyledIconButton disableRipple sx={{
                            justifyContent: 'space-between',
                            width: '100%',
                            textAlign: 'left',
                            borderRadius: '0',
                            padding: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(0,0,0,.2)',
                            }
                        }}>
                            {option.icon}
                            <p style={{ marginLeft: '.5rem', width: '90%', fontSize: '1.2rem' }} >{option.text}</p>
                            <NavigateNextIcon sx={{ fontSize: '1.7rem' }} ></NavigateNextIcon>
                        </StyledIconButton>
                    </>
                })
            }
            <StyledOptionSectionLogout />
            <StyledIconButton disableRipple sx={{
                justifyContent: 'space-between',
                width: '100%',
                textAlign: 'left',
                borderRadius: '0',
                padding: 1,
                color: 'rgb(255,25,25)',
                '&:hover': {
                    backgroundColor: 'rgba(255,0,0,.3)',
                }
            }}>
                <LogoutIcon sx={{ fontSize: '1.5rem' }}></LogoutIcon>
                <p style={{ marginLeft: '.5rem', width: '100%', fontSize: '1.2rem' }} >Logout</p>
            </StyledIconButton>



        </div>
    );
}

export default Settings;
