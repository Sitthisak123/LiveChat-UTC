import { createContext, useEffect, useState } from "react";
import Auth from "../Middleware/Auth.js";
import Sidebar from "./Sidebar/Sidebar.js";
import { SLayout, SMain } from "./styles.js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../_stores/Slices/user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG } from '../_stores/Slices/chat_msg.js';
import { CREATE_FRIENDS_STATUS, UPDATE_FRIENDS_STATUS, DELETE_FRIENDS_STATUS, CLEAR_FRIENDS_STATUS } from '../_stores/Slices/Friends_Status';
import useErrorHandling_socket from "../_methods/HandleError_socket.js";
const ENDPOINT = 'http://localhost:9001';
export const SocketMethod = createContext();

const Home = ({ children }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
  const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
  if (!TOKEN || User_data.value.length < 1) {
    Navigate("/Auth");
  }

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { handleErrors_socket } = useErrorHandling_socket();

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      // pass the token in the headers field
      extraHeaders: {
        'access-token-key': User_data.value.user_TOKEN,
      }
    });
    // Assuming you have access to the user_id value on the client-side
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('send', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('test', (data) => {
      console.log(data);
    });


    socket.on('message', (data) => {
      console.log(data);
      dispatch(CREATE_CHAT_MSG(data.newMessage));
    });

    socket.on('Unsend-message', (data) => {
      console.log(data)
      if (data.status === 200) {
        const { newStatus, msg_id} = data.UnsendMessage;
        if (newStatus === 2) {
          dispatch(UPDATE_CHAT_MSG({ msg_reply_id: msg_id, msg_status_owner: newStatus, msg_reply_message: "unsend" }));
        } else if (newStatus === 1) {
          dispatch(DELETE_CHAT_MSG(msg_id));
        }
      } else {
        handleErrors_socket(data);
      }
    });


    return () => socket.off('send');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  function socket_sendMessage(msg, friend_id, chat_id) {
    socket.emit('message', { msg, friend_id, chat_id });
  }
  function socket_UnSendMessage(data) {
    socket.emit('Unsend-message', data);
  }


  return (
    <SocketMethod.Provider value={{ socket_sendMessage, socket_UnSendMessage }}>
      <SLayout>
        <Sidebar />
        <SMain>{children}</SMain>
      </SLayout>
    </SocketMethod.Provider>
  )
}
export default Home;