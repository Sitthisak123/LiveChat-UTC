/* eslint-disable eqeqeq */
import './Chat_message.css';
import Avatar from '@mui/material/Avatar';
import img from '../../../../_assets/1.jpg';
import { useSelector } from 'react-redux';

const Chat_message = (props) => {
  const { User_data } = useSelector((state) => ({ ...state }));
  const my_id = User_data.value.user_id;


  const { id, from_id, name, message, timest } = props;

  return (
    <div key={id} className={`Chat_message_list ${my_id == from_id ? 'right' : 'left'}`}>
      <div className='Chat_Avatar'>
        <Avatar alt={name} src={img} />
      </div>
      <div className={`Chat_informations ${my_id == from_id ? 'right' : 'left'}`}>
        <div className='Chat_msg'>{message}</div>
        <div className={`chat_info ${my_id == from_id ? 'right' : 'left'}`}>
          <div className='chat_info_time'>{timest}</div>
          <div className='chat_info_name'>{my_id == from_id ? 'You' : `Name ${name}`}</div>
        </div>
      </div>
    </div>
  )
}
export default Chat_message;