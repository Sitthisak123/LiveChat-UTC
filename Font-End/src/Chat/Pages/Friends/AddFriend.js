import './AddFriend.css'
import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FriendCard from './Components/FreindCard';
import FriendContent from './Components/Content';
import SearchIcon from '@mui/icons-material/Search';
import { StyledAddFriendIconButton } from '../../styles';
import { StyledPageHeaders } from '../../styles';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Badge } from '@mui/material';
import { Responsive } from '../../../styles/variables';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const AddFriend = () => {
    const { pathname } = useLocation();
    const pathnamelowcase = pathname.toLowerCase();
    const Navigate = useNavigate();
    const [RadioState, setRadioState] = useState('ID');
    
    return (
        <div className='Friends-main'>
            <div className='Friends-Content-Headers'>
                <StyledPageHeaders>
                    <StyledAddFriendIconButton
                        aria-label={'Back to Friend list'}
                        style={{
                            height: Responsive.sidebar,
                            padding: 0,
                            paddingLeft: '.3rem',
                            paddingRight: '.5rem',
                            top: 0,
                            left: 0
                        }}
                        onClick={() => Navigate('Friend')}
                    >
                        <ArrowBackIosNewOutlinedIcon />
                    </StyledAddFriendIconButton>
                    <p>Invite</p>
                </StyledPageHeaders>


                <div className='Invite-Nav'>
                    <FormControl style={{
                        padding: '.5rem 1rem'
                    }}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="ID"
                            onChange={(event) => setRadioState(event.target.value)}
                        >
                            <FormControlLabel
                                value="ID"
                                control={<Radio />} 
                                label="ID"
                            />
                            <FormControlLabel
                                value="E-Mail"
                                control={<Radio />}
                                label="E-Mail"
                            />
                            <FormControlLabel
                                value="Phone"
                                control={<Radio />}
                                label="Phone"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>


                <SSearch style={{
                    width: `100%`,
                    marginBottom: '.35rem',
                    marginTop: '.35rem',
                    paddingTop: '.2rem'
                }}>
                    <input
                        placeholder={`Enter Your Friends ${RadioState === "Phone" ? `Number ${RadioState}`:RadioState}`}
                    />
                    <StyledAddFriendIconButton aria-label={'0'}>
                        <SearchIcon />
                    </StyledAddFriendIconButton>
                </SSearch>

            </div>
            <FriendCard />
            <FriendCard />
            <FriendCard />

        </div>
    )
}

export default AddFriend;