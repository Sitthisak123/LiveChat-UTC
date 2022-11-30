import './Chat_friend.css';
import logo from '../_assets/img/logo192.png';
const Chat_friend = (props) => {
  const { key, name, last_message } = props
  return (
    <div className="Chat_friend-card">
      <div className="Chat_friend-img">
      <img src={logo} />
      <span className="Chat_friend-status"></span>
      </div>
      <div className="Chat_details">
        <div className="Chat_name_n_time">
          <p className="Chat_friend-name">
            { name }
          </p>
        <p className="Chat_friend-last-msg">
          { last_message }
        </p>
        </div>
      </div>
    </div>
    )
}
export default Chat_friend;