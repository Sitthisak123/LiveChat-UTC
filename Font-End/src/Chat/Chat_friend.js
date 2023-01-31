import './Chat_friend.css';
import logo from '../_assets/logo192.png';
import { forwardRef } from 'react';

const Chat_friend = forwardRef((props, ref) => {
  const { key, name, last_message, uid } = props;
  function handleClick() {
    props.onClick(uid);
  }
  return (
    <div className="Chat_friend-card" id-key={key} onClick={handleClick} ref={ref}>
      <div className="Chat_friend-img">
        <img src={logo} />
        <span className="Chat_friend-status"></span>
      </div>
      <div className="Chat_details">
        <div className="Chat_name_n_time">
          <p className="Chat_friend-name">
            {name}
          </p>
          <p className="Chat_friend-last-msg">
            {last_message}
          </p>
        </div>
      </div>
    </div>
  )
})
export default Chat_friend;