import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Chatfriend from './components/Chat_friend.js';
import { useContext, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../../../_stores/Slices/chat_user.js';
import { CREATE_CONVERSATION_SORTED, CREATE_CONVERSATION_PIN, CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../../../_stores/Slices/chat_conversation.js';
import { ChatContext } from '../../Chat_content.js';
import { useMediaQuery } from '@react-hook/media-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const Conversation = () => {
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const { Chat_state, setChat_state } = useContext(ChatContext);
    const anchorEl = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const [action, setAction] = useState(0);
    const isSmallScreen = useMediaQuery('(max-width: 780px)');
    function On_Chat_friend(props) {
        setChat_state({ ...Chat_state, ...props });
    }
    function handleOpenMenu() {
        setMenuOpen(true);
    }
    function handleCloseMenu() {
        setMenuOpen(false);
    }

    function handleAction(value) {
        handleCloseMenu();
        setAction(value);
    }

    useEffect(() => {
        const conversations = Chat_data_conversation.conversation.map((chat) => {
            const user_id = chat.chat_user_one === User_data.value.user_id ? chat.chat_user_two : chat.chat_user_one;
            const user = Chat_data_users.users.find(user => user.user_id === user_id);
            const last_reply_msg = Chat_data_msg.chat_msg.filter(item => item.fk_chat_id === chat.chat_id)?.at(-1);
            const last_msg = last_reply_msg?.msg_reply_message;
            const last_msg_time = last_reply_msg?.msg_createTime;
            if ((!last_msg) && (chat.chat_open === false || chat.chat_open === undefined)) {
                return null;
            }
            return {
                ...chat,
                last_msg,
                last_msg_time,
                uid: user_id,
                username: user.user_name,
                image: user.user_profile_img,
            };
        })
            .filter(chat => chat !== null)
            .sort((a, b) => new Date(b.last_msg_time) - new Date(a.last_msg_time));

        const pinned_conversations = conversations.filter(chat => chat.chat_status_one || chat.chat_status_two);
        const sorted_conversations = conversations.filter(chat => !chat.chat_status_one && !chat.chat_status_two);

        dispatch(CREATE_CONVERSATION_PIN(pinned_conversations));
        dispatch(CREATE_CONVERSATION_SORTED(sorted_conversations));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Chat_data_conversation.conversation, Chat_data_msg.chat_msg, Chat_data_users.users]);



    return (
        <>
            <SSearch style={{
                width: `100%`,
                marginBottom: '.35rem'
            }}>
                <SSearchIcon>
                    <SearchOutlinedIcon />
                </SSearchIcon>
                <input
                    placeholder="Search"
                />
                {
                    action ?
                        <SSearchIcon onClick={() => setAction(0)} style={{ cursor: 'pointer' }}>
                            <DoDisturbAltIcon />
                        </SSearchIcon>
                        :
                        <SSearchIcon ref={anchorEl} onClick={handleOpenMenu} style={{ cursor: 'pointer' }}>
                            <MoreVertIcon />
                        </SSearchIcon>
                }
            </SSearch>

            {
                Chat_data_conversation.conversation_Pin.map((data) => {
                    try {

                        return (
                            <Chatfriend
                                isActive={Chat_state.cid === data.chat_id ? true : false}
                                key={data.chat_id}
                                name={data.username}
                                last_message={data.last_msg}
                                uid={data.uid}
                                cid={data.chat_id}
                                image={data.user_profile_img}
                                onClick={On_Chat_friend}
                                pinned={true}
                                action={action}
                                status={{ chat_status_one: data.chat_status_one, chat_status_two: data.chat_status_two }}
                            />
                        )
                    } catch (error) {
                        alert('{ Chat_data_conversation.conversation_pin.map } error')
                        console.log(error)
                    }
                })

            }
            {
                Chat_data_conversation.conversation_Sorted.map((data) => {
                    try {

                        return (
                            <Chatfriend
                                isActive={Chat_state.cid === data.chat_id ? true : false}
                                key={data.chat_id}
                                name={data.username}
                                last_message={data.last_msg}
                                uid={data.uid}
                                cid={data.chat_id}
                                image={data.user_profile_img}
                                onClick={On_Chat_friend}
                                action={action}
                                status={{ chat_status_one: data.chat_status_one, chat_status_two: data.chat_status_two }}
                            />
                        )
                    } catch (error) {
                        alert('{ Chat_data_conversation.conversation_Sorted.map } error')
                        console.log(error)
                    }
                })

            }
            <Menu
                anchorEl={anchorEl.current}
                open={menuOpen}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleAction(1)} disableRipple>Pin</MenuItem>
                <MenuItem onClick={() => handleAction(3)} disableRipple>Delete</MenuItem>
            </Menu>
        </>
    )
}
export default Conversation;