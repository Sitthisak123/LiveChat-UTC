/* eslint-disable react/jsx-pascal-case */
import './Chat_content.css';
import Chat_friend from './Chat_friend';
import Chat_message from './Chat_message';
import { AppDataContext } from '../_data_provider/Chat.js';
import { useContext, useRef } from 'react';

const Chat_content = () => {
  // const Chat_friend_Ref     = useRef(null);
  const Chat_textarea       = useRef(null);
  const Chat_textarea_frame = useRef(null);
  const Chat_Conversation   = useRef(null);

  // const message = useContext(AppDataContext);
  // function On_Chat_friend(uid) {
  //   console.log(uid);
  // }
  function autosize() {
    Chat_textarea.current.style.height = '0px';
    const height = Math.min(20 * 7, Chat_textarea.current.scrollHeight);
    console.log(Chat_textarea.current.scrollHeight);
    Chat_textarea_frame.current.style.height = `${height}px`;
    Chat_textarea.current.style.height = `${height}px`;
  }
  return (
    <div className="Chat_content-section">

      <div className="Chat_friends">
        {/* {friends.map((data, key) => {
          return <Chat_friend key={data.id} name={data.name} last_message={data.last_message} ref={Chat_friend_Ref} uid={data.id} onClick={On_Chat_friend} />
        })} */}
      </div>

      <div className='Chat-section' ref={Chat_Conversation}>
        <div className="Chat_conversation">
          {/* {message.map((data, key) => {
            return <Chat_message {...data} />
          })} */}
        </div>
        {/* <div className='ta-frame' ref={Chat_textarea_frame}>
          <textarea rows='1' ref={Chat_textarea} onChange={autosize}></textarea>
          <button className='Chat_msg-send-btn' onClick={() => { alert("msg-send-btn-clicked") }}><span>Send</span></button>
        </div> */}
      </div>
    </div>
  )
}
export default Chat_content;