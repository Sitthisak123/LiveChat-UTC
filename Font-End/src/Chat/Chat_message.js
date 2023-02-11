/* eslint-disable eqeqeq */
import './Chat_message.css';
import Avatar from '@mui/material/Avatar';
import img from '../_assets/1.jpg';

// const Chat_message = (props) => {
//   const from_one_class = 'from_one'
//   const from_two_class = 'from_two'
//   const {id, from_id, message, timest} = props

//   return(
//     <div className={`message_Box-${ from_id === "one" ? from_one_class:from_two_class }`}>
//       <div className={`message_class ${ from_id === "one" ? from_one_class:from_two_class }`}>
//       { ` ${message} ${from_id}`}
//       </div>
//     </div>
//     )
// }
// export default Chat_message;

const Chat_message = (props) => {
  //// Test data ////
  const my_id = '123';
  ///////////////////////

  const { id, from_id, name, message, timest } = props;

  return (
    <div key={id} className={`Chat_message_list ${my_id == from_id ? 'right' : 'left'}`}>
      <div className='Chat_Avatar'>
        <Avatar alt="Remy Sharp" src={img} />
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