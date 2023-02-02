/* eslint-disable react/jsx-pascal-case */
import './Chat_content.css';
import Chat_friend from './Chat_friend';
import Chat_message from './Chat_message';
import { USERContext } from '../App.js';
import { BoxCards } from './styles'
import { useContext, useRef } from 'react';



const Chat_content = () => {
  const Chat_friend_Ref = useRef(null);
  const Chat_textarea = useRef(null);
  const Chat_textarea_frame = useRef(null);
  const Chat_Conversation = useRef(null);

  const { userCont, userContDispatch } = useContext(USERContext);
  function On_Chat_friend(uid) {
    console.log(uid);
  }
  function autosize() {
    Chat_textarea.current.style.height = '0px';
    const height = Math.min(20 * 7, Chat_textarea.current.scrollHeight);
    console.log(Chat_textarea.current.scrollHeight);
    Chat_textarea_frame.current.style.height = `${height}px`;
    Chat_textarea.current.style.height = `${height}px`;
  }
  function test() {
    userContDispatch({ type: 'allUser' });
    alert(`msg-send-btn-clicked ${userCont[0].data}`);
    // console.log(userCont);
  }
  return (
    <div className="Chat_content-section">

      <BoxCards>
        {/* {USERdata.map((data, key) => {
          return <Chat_friend
            key={data.id}
            name={data.name}
            last_message={data.last_message}
            ref={Chat_friend_Ref} uid={data.id}
            onClick={On_Chat_friend} />
        })} */}

        <Chat_friend key={'sgf1y2'} name={'ospjfdopjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'15'} onClick={On_Chat_friend} />
        <Chat_friend key={'sfj1y2'} name={'ospjfodpjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'81'} onClick={On_Chat_friend} />
        <Chat_friend key={'sf1hy2'} name={'ospjfdopjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'61'} onClick={On_Chat_friend} />
        <Chat_friend key={'shf1y2'} name={'ospjfopjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'71'} onClick={On_Chat_friend} />
        <Chat_friend key={'sff12'} name={'ospjfopjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'21'} onClick={On_Chat_friend} />
        <Chat_friend key={'sf1j2'} name={'ospjfofhpjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'17'} onClick={On_Chat_friend} />
        <Chat_friend key={'gsf12'} name={'ospjfofhpjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'177'} onClick={On_Chat_friend} />
        <Chat_friend key={'sfj12'} name={'ospjfogjpjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'41'} onClick={On_Chat_friend} />
        <Chat_friend key={'sf1v2'} name={'ospjfopjs'} last_message={"skofeksf"} ref={Chat_friend_Ref} uid={'14'} onClick={On_Chat_friend} />
      </BoxCards>

      <div className='Chat-section' ref={Chat_Conversation}>
        {/* <div className="Chat_conversation">
          {USERdata.map((data, key) => {
            return <Chat_message {...data} />
          })}
        </div> */}
        <div className='ta-frame' ref={Chat_textarea_frame}>
          <textarea rows='1' ref={Chat_textarea} onChange={autosize}></textarea>
          <button className='Chat_msg-send-btn' onClick={test}><span>Send</span></button>
        </div>
      </div>
    </div>
  )
}
export default Chat_content;