/* eslint-disable react/jsx-pascal-case */
import { useRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

import './Chat_content.css';
import Home from '../Home/Home.js';
import Chat from './Pages/Conversation/Chat.js';
import { BoxCards } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../_stores/Slices/user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHA_CHATT_MSGS } from '../_stores/Slices/chat_msg.js';
import { API_Conversation } from '../_APIs/user';

const Chat_content = () => {
  const dispatch = useDispatch();
  const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
  const Navigate = useNavigate();
  const location = useLocation();
  const Chat_Conversation_Ref = useRef();

  useEffect(() => {

    if (!localStorage.getItem("user") || User_data.value.length < 1) {
      Navigate("/Login");
    } else {
      API_Conversation.post('', {}, { headers: { 'access-token-key': User_data.value.user_TOKEN } }).then(response => {
        dispatch(CREATE_CONVERSATION(response.data.conversation));
        dispatch(CREATE_CHAT_USERS(response.data.users));
        dispatch(CREATE_CHAT_MSG(response.data.chat_msg));
      }).catch(error => {
        alert(error.response.data)
        console.log(error.response.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Home>
      <div className="Chat_content-section">
        <BoxCards>
          <Outlet />
        </BoxCards>
        <div className='Chat-section' ref={Chat_Conversation_Ref}>
          <Chat  />
        </div>
      </div >
    </ Home>
  )
}
export default Chat_content;