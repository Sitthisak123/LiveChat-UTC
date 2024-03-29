import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DELETE_USER } from '../_stores/Slices/user.js';
import { CLEAR_CONVERSATION } from '../_stores/Slices/chat_conversation.js';
import { CLEAR_CHAT_USERS } from '../_stores/Slices/chat_user.js';
import { CLEAR_CHAT_MSG } from '../_stores/Slices/chat_msg.js';
import { CREATE_SUSPEND_STATUS } from '../_stores/Slices/system.js';

const useErrorHandling = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleErrors = (error) => {
    const data = error.response.data;
    const status = error.response.status
    if (status > 400 && status < 404) {
      alert(data.text);
      localStorage.removeItem('TOKEN');
      dispatch(DELETE_USER());
      dispatch(CLEAR_CONVERSATION());
      dispatch(CLEAR_CHAT_USERS());
      dispatch(CLEAR_CHAT_MSG());
      dispatch(DELETE_USER());
    } else {
      if (data.text) {
        alert(data.text);
      }
    }
    if (status === 403 && data.suspendAt) {
      dispatch(CREATE_SUSPEND_STATUS(data));
      alert(`Suspended ${data.suspendAt}`);
      Navigate("/Auth");
    }

    console.log(error.response)
    if (data.route) {
      alert(`route(${data.route})`);
      Navigate(data.route);
    }
  };

  return { handleErrors };
};
export default useErrorHandling;