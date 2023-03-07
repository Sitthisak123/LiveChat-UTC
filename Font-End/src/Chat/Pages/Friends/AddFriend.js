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
import { useSelector } from 'react-redux';
import { API_FindByUnique } from '../../../_APIs/user';
import useErrorHandling from '../../../_methods/HandleError';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { API_RequestFriend } from '../../../_APIs/system';

const AddFriend = () => {
    const { pathname } = useLocation();
    const pathnamelowcase = pathname.toLowerCase();
    const Navigate = useNavigate();
    const { handleErrors } = useErrorHandling();
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg, Friends_relation } = useSelector((state) => ({ ...state }));
    const [findBy, setfindBy] = useState('ID');
    const [unique, setUnique] = useState(null);
    const [findUsers, setFindUsers] = useState([]);
    const [findUsers_onload, setFindUsers_onload] = useState(false);

    const handleFind = () => {
        setFindUsers([])
        setFindUsers_onload(true)
        API_FindByUnique(User_data.value.user_TOKEN).post('', { unique, findBy }).then((response) => {
            const data = [response.data.users]
            const newdata = data.map(user => {
                const user_id = user.user_id;
                const relation = Friends_relation.Friend_data.find(rel =>
                    rel.fk_user_one === user_id
                );
                const relation_myOwner = Friends_relation.Friend_data.find(rel =>
                    rel.fk_user_two === User_data.value.user_id
                );
                if (relation) {
                    user.relation_status = relation.relation_status;
                } else if (relation_myOwner) {
                    user.relation_status_owner = relation_myOwner.relation_status;
                }
                return user
            });
            setFindUsers(newdata)
            setFindUsers_onload(false)
        }).catch((error) => {
            setFindUsers_onload(false)
            handleErrors(error);

        })
    }


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
                        onClick={() => Navigate(-1)}
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
                            onChange={(event) => {
                                setfindBy(event.target.value)
                            }}
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
                    <input value={unique} placeholder={`Enter Your Friends ${findBy === "Phone" ? `Number ${findBy}` : findBy}`} onChange={(event) => setUnique(event.target.value)} />
                    <StyledAddFriendIconButton onClick={() => handleFind()} aria-label={'Search'}>
                        {
                            findUsers_onload ?
                                <Fade in={true} style={{ transitionDelay: '0ms', scale: '.6' }} unmountOnExit >
                                    <CircularProgress />
                                </Fade>
                                :
                                <SearchIcon />
                        }
                    </StyledAddFriendIconButton>
                </SSearch>


            </div>
            <div className=''>
                {
                    findUsers?.map((user, index) => {
                        var ctype = null;
                        var relation = null;
                        console.log(user)
                        if (user.relation_status !== undefined && user.relation_status !== null) {
                            ctype = user.relation_status
                            relation = (ctype === 1 || ctype === 2 || ctype === 3 || ctype === 0) ? ctype : null
                        } else if (user.relation_status_owner !== undefined && user.relation_status_owner !== null) {
                            ctype = user.relation_status_owner;
                            relation = (ctype === 1 || ctype === 2 || ctype === 0) ? ctype : ctype === 3 ? 3.1 : null
                        }
                        if (relation !== 0) {
                            return (<FriendCard CardID={null} CardType={(relation !== undefined && relation !== null) ? relation : -1} CardName={user.user_name} FriendID={user.user_id} />)
                        }
                    })
                }

            </div>
        </div>
    )
}

export default AddFriend;