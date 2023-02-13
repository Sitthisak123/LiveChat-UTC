import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Chatfriend from './components/Chat_friend.js';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../../../_stores/Slices/chat_user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../../../_stores/Slices/chat_conversation.js';



const Conversation = () => {
    const dispatch = useDispatch();

    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));

    const [Chat_friend_state, setChat_friend_state] = useState(null);
    function On_Chat_friend(uid) {
        setChat_friend_state(uid);
        console.log(uid);
        alert(uid);
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
            {/* {USERdata.map((data, key) => {
    return <Chat_friend
      key={data.id}
      name={data.name}
      last_message={data.last_message}
      ref={Chat_friend_Ref} uid={data.id}
      onClick={On_Chat_friend} />
  })} */}
            {/* <Chatfriend key={'sgf1y2'} name={'ospjfdopjs'} last_message={"skofeksf"} uid={'15'} onClick={On_Chat_friend} />
            <Chatfriend key={'sfj1y2'} name={'ospjfodpjs'} last_message={"skofeksf"} uid={'81'} onClick={On_Chat_friend} />
            <Chatfriend key={'sf1hy2'} name={'ospjfdopjs'} last_message={"skofeksf"} uid={'61'} onClick={On_Chat_friend} />
            <Chatfriend key={'shf1y2'} name={'ospjfopjs'} last_message={"skofeksf"} uid={'71'} onClick={On_Chat_friend} />
            <Chatfriend key={'sff12'} name={'ospjfopjs'} last_message={"skofeksf"} uid={'21'} onClick={On_Chat_friend} />
            <Chatfriend key={'sf1j2'} name={'ospjfofhpjs'} last_message={"skofeksf"} uid={'17'} onClick={On_Chat_friend} />
            <Chatfriend key={'gsf12'} name={'ospjfofhpjs'} last_message={"skofeksf"} uid={'177'} onClick={On_Chat_friend} />
            <Chatfriend key={'sfj12'} name={'ospjfogjpjs'} last_message={"skofeksf"} uid={'41'} onClick={On_Chat_friend} />
            <Chatfriend key={'sf1v2'} name={'ospjfopjs'} last_message={"skofeksf"} uid={'14'} onClick={On_Chat_friend} /> */}
            {
                Chat_data_conversation.conversation.map((data) => {
                    try {
                        const user_id = data.chat_user_one === User_data.value.user_id ? data.chat_user_two : data.chat_user_one;
                        const user = Chat_data_users.users.find(user => user.user_id === user_id)
                        const last_msg = Chat_data_msg.chat_msg.filter(item => item.fk_chat_id === data.chat_id).at(-1).msg_reply_message;
                        console.log(last_msg);
                        return <Chatfriend key={data.chat_id} name={user.user_name} last_message={last_msg} uid={user.user_id} onClick={On_Chat_friend} />
                    } catch (error) {
                        console.log(error)
                    }
                })
            }

        </>
    )
}
export default Conversation;