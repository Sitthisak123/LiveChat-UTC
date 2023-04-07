import Headbar from './Component/Headbar.js';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector } from 'react-redux';
import { CREATE_FRIENDS_STATUS, UPDATE_FRIENDS_STATUS, DELETE_FRIENDS_STATUS, CLEAR_FRIENDS_STATUS } from '../../../../_stores/Slices/Friends_Status';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));

function Friends() {
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg, Friends_relation } = useSelector((state) => ({ ...state }));
    const [blockedFriends, setBlockedFriends] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const BlockedFiltered = Friends_relation.Friend_data.filter(relation =>
            relation.fk_user_one === User_data.value.user_id && relation.relation_status === 0
        )
        setBlockedFriends(BlockedFiltered)
    }, [Friends_relation.Friend_data])
    return (
        <>
            <Headbar HeadName={'Friends'} />
            <div className='option'>
                <StyledOptionSection>Add friends</StyledOptionSection>
                <StyledSettingIconButton disableRipple sx={{ fontSize: '1.2rem' }} >
                    <p>Allow others to add me</p>
                    <FormGroup>
                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                    </FormGroup>
                </StyledSettingIconButton>
                <StyledOptionSection>Manage friends</StyledOptionSection>
                <StyledSettingIconButton 
                disableRipple 
                sx={{ fontSize: '1.2rem' }}
                onClick={()=>navigate('../Blocked-Manage')}
                >
                    <p>{`Blocked Account(${blockedFriends? blockedFriends.length : 0})`}</p>
                    <NavigateNextIcon />
                </StyledSettingIconButton>
            </div>
        </>
    )

}

export default Friends;
