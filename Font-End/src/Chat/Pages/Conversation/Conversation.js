import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Chatfriend from './components/Chat_friend.js';
import { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatContext } from '../../Chat_content.js';
import { useMediaQuery } from '@react-hook/media-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const Conversation = () => {
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
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
                                image={data.image}
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
                                image={data.image}
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