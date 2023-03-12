import './FreindCard.css';
import { StyledCard, StyledCardHeader, StyledBadge, StyledFriendActionIconButton } from "../../../styles";
import { Avatar } from "@mui/material";
import img from '../../../../_assets/1.jpg';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pink } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useContext } from 'react';
import { API_ChangeRelations, API_RequestFriend } from '../../../../_APIs/system.js';
import { useSelector, useDispatch } from 'react-redux';
import useErrorHandling from '../../../../_methods/HandleError';
import {
    CREATE_FRIENDS_STATUS,
    UPDATE_FRIENDS_STATUS,
    DELETE_FRIENDS_STATUS,
    CLEAR_FRIENDS_STATUS,
} from '../../../../_stores/Slices/Friends_Status';
import {
    CREATE_CONVERSATION,
    UPDATE_CONVERSATION,
    DELETE_CONVERSATION,
    CLEAR_CONVERSATION,
} from '../../../../_stores/Slices/chat_conversation.js';
import { ChatContext } from '../../../Chat_content';
import { API_NewChat } from '../../../../_APIs/user';
const FriendCard = (props) => {
    const { CardType, CardName, FriendID } = props;
    const { Chat_state, setChat_state } = useContext(ChatContext);
    console.log(CardType);
    //0 = block, 1,2 = friend,favorite, 3 = request
    const { User_data, Chat_data_users, Friends_relation, Chat_data_conversation } = useSelector((state) => ({ ...state }));
    const dispacth = useDispatch();
    const { handleErrors } = useErrorHandling();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClosewith = () => {
        /////////// code
        setAnchorEl(null);
    };
    const handleClosewithChat = () => {
        const chat = Chat_data_conversation.conversation.filter(chat => (chat.chat_user_one === User_data.value.user_id && chat.chat_user_two === FriendID) || (chat.chat_user_one === FriendID && chat.chat_user_two === User_data.value.user_id));
        
        if (chat.length) {
            alert(chat[0].chat_id)
            dispacth(UPDATE_CONVERSATION({chat_id: chat[0].chat_id, chat_open: true}));
            setChat_state({ cid: chat[0].chat_id, uid: FriendID });
            return 
        }
        API_NewChat(User_data.value.user_TOKEN).put('', { FriendID }).then((response) => {
            const data = response.data;
            const newChat = { ...data, chat_open: true }
            setChat_state({ cid: newChat.chst_id, uid: FriendID });
            dispacth(UPDATE_CONVERSATION(response.data));
        }).catch((error) => {
            handleErrors(error);
        })
    }
    const handleChangeRelations = (newRelation) => {
        API_ChangeRelations(User_data.value.user_TOKEN).put('', { newRelation, FriendID }).then((response) => {
            if (newRelation === -1 || newRelation === 0) {
                console.log(`delete> id: ${User_data} id: ${User_data.value.user_id} status: ${FriendID}`)
                console.log(Friends_relation)
                dispacth(DELETE_FRIENDS_STATUS({ fk_user_one: User_data.value.user_id, fk_user_two: FriendID }))
                console.log(Friends_relation)
            } else {
                dispacth(UPDATE_FRIENDS_STATUS({ fk_user_one: User_data.value.user_id, fk_user_two: FriendID, relation_status: newRelation }))
            }
        }).catch((error) => {
            handleErrors(error);
        })
    }
    const HandleRequestFriend = () => {
        alert(FriendID);
        API_RequestFriend(User_data.value.user_TOKEN).put('', { FriendID }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            handleErrors(error);
        });
    }

    return (
        <StyledCard>
            <StyledCardHeader
                avatar={
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar alt="Remy Sharp" src={img} />
                    </StyledBadge>
                }
                title={
                    <div className="Card-Content">
                        <p>{CardName}</p>
                        {
                            (CardType === 1 || CardType === 2) ?
                                <div className='Card-Action'>
                                    <StyledFriendActionIconButton onClick={handleClick}><MoreHorizIcon /></StyledFriendActionIconButton>
                                </div>
                                : CardType === 3 ?
                                    <div className='Card-Action'>
                                        <StyledFriendActionIconButton onClick={() => handleChangeRelations(1)} ><DoneIcon color='success' /></StyledFriendActionIconButton>
                                        <StyledFriendActionIconButton onClick={() => handleChangeRelations(-1)} ><ClearIcon sx={{ color: pink[500] }} /></StyledFriendActionIconButton>
                                    </div>
                                    : CardType === 3.1 ?
                                        <div className='Card-Action'>
                                            <StyledFriendActionIconButton onClick={null} ><CheckCircleIcon color='primary' sx={{ scale: '1.2' }} /></StyledFriendActionIconButton>
                                        </div>
                                        : CardType === 0 ?
                                            '' : CardType === -1 ?
                                                <div className='Card-Action'>
                                                    <StyledFriendActionIconButton onClick={() => HandleRequestFriend()} ><PersonAddAlt1Icon color='primary' sx={{ scale: '1.2' }} /></StyledFriendActionIconButton>
                                                </div>
                                                :
                                                ''
                        }

                    </div>
                }
                subheader=''
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClosewithChat} disableRipple>Chat</MenuItem>
                <MenuItem onClick={handleClosewith} disableRipple>Profile</MenuItem>
                {
                    CardType === 1 ?
                        <MenuItem onClick={() => handleChangeRelations(2)} disableRipple>Favorite</MenuItem>
                        :
                        <MenuItem onClick={() => handleChangeRelations(1)} disableRipple>Unfavorite</MenuItem>
                }
                <MenuItem onClick={() => handleChangeRelations(0)} disableRipple>Block</MenuItem>
                <MenuItem onClick={() => handleChangeRelations(-1)} disableRipple>Delete</MenuItem>

            </Menu>
        </StyledCard>
    );
}
export default FriendCard;