import { createContext, useEffect, useState } from "react";
import Auth from "../Middleware/Auth.js";
import Sidebar from "./Sidebar/Sidebar.js";
import { SLayout, SMain } from "./styles.js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../_stores/Slices/user.js';
import { CREATE_CONVERSATION_SORTED, CREATE_CONVERSATION_PIN, CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG } from '../_stores/Slices/chat_msg.js';
import { CREATE_FRIENDS_STATUS, CREATE_ONCE_FRIENDS_STATUS, UPDATE_FRIENDS_STATUS, DELETE_FRIENDS_STATUS, CLEAR_FRIENDS_STATUS } from '../_stores/Slices/Friends_Status';
import useErrorHandling_socket from "../_methods/HandleError_socket.js";

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
    const newSocket = io(process.env.REACT_APP_SOCKET_API, {
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

    socket.on('newChat', (data) => {
      console.log(data)
      dispatch(CREATE_CONVERSATION(data));
    })
    socket.on('newRelation', (data) => {
      console.log('newRelation')
      console.log(data)
      dispatch(CREATE_ONCE_FRIENDS_STATUS(data.create_relation));
      dispatch(CREATE_CHAT_USERS(data.FriendData));
    })
    socket.on('upDateRelation', (data) => {
      console.log('upDateRelation')
      console.log(data)
      dispatch(UPDATE_FRIENDS_STATUS(data.update));
      dispatch(CREATE_CHAT_USERS(data.FriendData));
    })

    socket.on('Unsend-message', (data) => {
      console.log(data)
      if (data.status === 200) {
        const { newStatus, msg_id } = data.UnsendMessage;
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
    <SocketMethod.Provider value={{ socket_sendMessage, socket_UnSendMessage }}>
      <SLayout>
        <Sidebar />
        <SMain>{children}</SMain>
      </SLayout>
    </SocketMethod.Provider>
  )
}
export default Home;