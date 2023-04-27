import './FreindCard.css';
import { StyledCard, StyledCardHeader, StyledBadge, StyledFriendActionIconButton } from "../../../styles";
import { Avatar } from "@mui/material";
import img from '../../../../_assets/1.jpg';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pink } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useContext } from 'react';
import { API_ChangeRelations, API_RequestFriend } from '../../../../_APIs/system.js';
import { useSelector, useDispatch } from 'react-redux';
import useErrorHandling from '../../../../_methods/HandleError';
import {
    CREATE_FRIENDS_STATUS,
    CREATE_ONCE_FRIENDS_STATUS,
    UPDATE_FRIENDS_STATUS,
    DELETE_FRIENDS_STATUS,
    CLEAR_FRIENDS_STATUS,
} from '../../../../_stores/Slices/Friends_Status';
import { CREATE_CHAT_USERS } from '../../../../_stores/Slices/chat_user';
import {
    CREATE_CONVERSATION,
    UPDATE_CONVERSATION,
    DELETE_CONVERSATION,
    CLEAR_CONVERSATION,
} from '../../../../_stores/Slices/chat_conversation.js';
import { ChatContext } from '../../../Chat_content';
import { API_NewChat } from '../../../../_APIs/user';
import { useNavigate } from 'react-router-dom';

const FriendCard = (props) => {
    const { CardType, CardName, FriendID, CardImage } = props;
    const { Chat_state, setChat_state } = useContext(ChatContext);
    //0 = block, 1,2 = friend,favorite, 3 = request
    const { User_data, Chat_data_users, Friends_relation, Chat_data_conversation } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const { handleErrors } = useErrorHandling();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
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
            // alert(chat[0].chat_id)
            dispatch(UPDATE_CONVERSATION({ chat_id: chat[0].chat_id, chat_open: true }));
            setChat_state({ cid: chat[0].chat_id, uid: FriendID, pageState: true});
            navigate("../../Chat");
            return
        }
        API_NewChat(User_data.value.user_TOKEN).put('', { FriendID }).then((response) => {
            const data = response.data;
            const newChat = { ...data, chat_open: true }
            dispatch(CREATE_CONVERSATION(newChat));
            navigate("../../Chat");
            setChat_state({ cid: newChat.chst_id, uid: FriendID, pageState: true });
        }).catch((error) => {
            handleErrors(error);
        });
    }
    const handleChangeRelations = (newRelation) => {
        API_ChangeRelations(User_data.value.user_TOKEN).put('', { newRelation, FriendID }).then((response) => {
            // alert(newRelation)
            if (newRelation === -1) {
                dispatch(DELETE_FRIENDS_STATUS({ fk_user_one: User_data.value.user_id, fk_user_two: FriendID }))
            } else if (newRelation === 0) {
                const temp_newRelation = response.data.newRelation;
                dispatch(DELETE_FRIENDS_STATUS({ fk_user_one: User_data.value.user_id, fk_user_two: FriendID }))
                dispatch(CREATE_FRIENDS_STATUS([temp_newRelation]))
            } else {
                dispatch(CREATE_CHAT_USERS(response.data.FriendData));
                dispatch(UPDATE_FRIENDS_STATUS({ fk_user_one: User_data.value.user_id, fk_user_two: FriendID, relation_status: newRelation }))

            }
        }).catch((error) => {
            handleErrors(error);
        })
    }
    const HandleRequestFriend = () => {
        // alert(FriendID);
        API_RequestFriend(User_data.value.user_TOKEN).put('', { FriendID }).then((response) => {
            const {create_relation, FriendData } = response.data;
            dispatch(CREATE_ONCE_FRIENDS_STATUS(create_relation));
        }).catch((error) => {
            handleErrors(error);
        });
    }

    return (
        <StyledCard>
            <StyledCardHeader
                avatar={
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar alt={`${CardName}_${FriendID}`} src={`${process.env.REACT_APP_IMG_URL}${FriendID}/${CardImage}`} />
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
                                            <div className='Card-Action'>
                                                <StyledFriendActionIconButton onClick={() => handleChangeRelations(1)} ><RemoveCircleOutlineIcon color='success' /></StyledFriendActionIconButton>
                                                <StyledFriendActionIconButton onClick={() => handleChangeRelations(-1)} ><DeleteOutlineIcon sx={{ color: pink[500] }} /></StyledFriendActionIconButton>
                                            </div> : CardType === -1 ?
                                                <div className='Card-Action'>
                                                    <StyledFriendActionIconButton onClick={() => HandleRequestFriend()} ><PersonAddAlt1Icon color='primary' sx={{ scale: '1.2' }} /></StyledFriendActionIconButton>
                                                </div>
                                                :
                                                ''
                        }

                    </div>
                }
                subheader={``}
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