import './Chat_message.css';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

const ChatmessageUnsend = (props) => {
  const { id, from_id, name, message, timest, image } = props;
  const { User_data } = useSelector((state) => ({ ...state }));
  const my_id = User_data.value.user_id;

  const date = new Date(timest);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const outputTime = `${year}/${month}/${day} ${hour}:${minute}`;

  return (
    <div key={id} className={`Chat_message_list ${my_id == from_id ? 'right' : 'left'}`}>

      <div className='Chat_Avatar'>
        <Avatar alt={name} src={`http://localhost:9001/user/image/${my_id == from_id ? my_id : from_id}/${my_id == from_id ? User_data.value.user_profile_img : image}`} />
      </div>

      <div className={`Chat_informations ${my_id == from_id ? 'right' : 'left'}`}>

        <div className='Chat_msg unsend' >{"Unsend"}</div>
        <div className={`chat_info ${my_id == from_id ? 'right' : 'left'}`}>
          <div className='chat_info_time'>{outputTime}</div>
          <div className='chat_info_name'>{my_id == from_id ? 'You' : ''}</div>
        </div>
      </div>
    </div>
  )
}
export default ChatmessageUnsend;