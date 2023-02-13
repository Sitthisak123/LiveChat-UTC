import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Chatfriend from './components/Chat_friend.js';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../../../_stores/Slices/chat_user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../../../_stores/Slices/chat_conversation.js';
import { ChatContext } from '../../Chat_content.js';


const Conversation = () => {
    const dispatch = useDispatch();
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
    const { Chat_state, setChat_state } = useContext(ChatContext);
    function On_Chat_friend(props) {
        setChat_state({ ...Chat_state,...props});
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
            </SSearch>
            {
                Chat_data_conversation.conversation.map((data) => {
                    try {
                        const user_id = data.chat_user_one === User_data.value.user_id ? data.chat_user_two : data.chat_user_one;
                        const user = Chat_data_users.users.find(user => user.user_id === user_id)
                        const last_msg = Chat_data_msg.chat_msg.filter(item => item.fk_chat_id === data.chat_id).at(-1).msg_reply_message;
                        return (
                            <Chatfriend
                                isActive={Chat_state.cid === data.chat_id ? true : false}
                                key={data.chat_id}
                                name={user.user_name}
                                last_message={last_msg}
                                uid={user.user_id}
                                cid={data.chat_id}
                                onClick={On_Chat_friend}
                            />
                        )
                    } catch (error) {
                        console.log(error)
                    }
                })
            }

        </>
    )
}
export default Conversation;