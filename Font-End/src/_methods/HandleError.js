import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../_stores/Slices/user.js';
import {
  CREATE_CONVERSATION,
  UPDATE_CONVERSATION,
  DELETE_CONVERSATION,
  CLEAR_CONVERSATION,
} from '../_stores/Slices/chat_conversation.js';
import {
  CREATE_CHAT_USERS,
  UPDATE_CHAT_USERS,
  DELETE_CHAT_USERS,
  CLEAR_CHAT_USERS,
} from '../_stores/Slices/chat_user.js';
import {
  CREATE_CHAT_MSG,
  UPDATE_CHAT_MSG,
  DELETE_CHAT_MSG,
  CLEAR_CHAT_MSG,
} from '../_stores/Slices/chat_msg.js';

 const useErrorHandling = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  
  const handleErrors = (error) => {
    const data = error.response.data;
    alert(data.text);
    console.log(data);

    localStorage.removeItem('TOKEN');
    dispatch(DELETE_USER());
    dispatch(CLEAR_CONVERSATION());
    dispatch(CLEAR_CHAT_USERS());
    dispatch(CLEAR_CHAT_MSG());
    dispatch(DELETE_USER());
    if (data.route) {
      Navigate(data.route);
    }
    console.log(error);
  };

  return { handleErrors };
};
export default useErrorHandling;