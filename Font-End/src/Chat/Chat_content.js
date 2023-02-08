/* eslint-disable react/jsx-pascal-case */
import './Chat_content.css';
import Chat_friend from './Chat_friend';
import Chat_message from './Chat_message';
import Chat_optionBar from './Chat_option-bar';
import { USERContext } from '../App.js';
import { BoxCards, StyledTextField, StyledChatConversation } from './styles'
import { useContext, useRef, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { SSearch, SSearchIcon } from '../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const Chat_content = () => {
  const Chat_textfield_Ref = useRef();
  const Chat_Conversation_Ref = useRef();


  const { userCont, userContDispatch } = useContext(USERContext);
  function On_Chat_friend(uid) {
    console.log(uid);
    alert(uid);
  }
  function TextFieldOnKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  function test() {
    userContDispatch({ type: 'allUser' });
    alert(`msg-send-btn-clicked ${userCont[0].data}`);
    // console.log(userCont);
  }
  return (
    <div className="Chat_content-section">

      <BoxCards>
        <SSearch style={{
          width: `100%`,
          marginBottom: '.35rem'
        }}>
          <SSearchIcon>
            <SearchOutlinedIcon />
          </SSearchIcon>
          <input
            placeholder="Search"
          />
        </SSearch>
        {/* {USERdata.map((data, key) => {
          return <Chat_friend
            key={data.id}
            name={data.name}
            last_message={data.last_message}
            ref={Chat_friend_Ref} uid={data.id}
            onClick={On_Chat_friend} />
        })} */}
        <Chat_friend key={'sgf1y2'} name={'ospjfdopjs'} last_message={"skofeksf"} uid={'15'} onClick={On_Chat_friend} />
        <Chat_friend key={'sfj1y2'} name={'ospjfodpjs'} last_message={"skofeksf"} uid={'81'} onClick={On_Chat_friend} />
        <Chat_friend key={'sf1hy2'} name={'ospjfdopjs'} last_message={"skofeksf"} uid={'61'} onClick={On_Chat_friend} />
        <Chat_friend key={'shf1y2'} name={'ospjfopjs'} last_message={"skofeksf"} uid={'71'} onClick={On_Chat_friend} />
        <Chat_friend key={'sff12'} name={'ospjfopjs'} last_message={"skofeksf"} uid={'21'} onClick={On_Chat_friend} />
        <Chat_friend key={'sf1j2'} name={'ospjfofhpjs'} last_message={"skofeksf"} uid={'17'} onClick={On_Chat_friend} />
        <Chat_friend key={'gsf12'} name={'ospjfofhpjs'} last_message={"skofeksf"} uid={'177'} onClick={On_Chat_friend} />
        <Chat_friend key={'sfj12'} name={'ospjfogjpjs'} last_message={"skofeksf"} uid={'41'} onClick={On_Chat_friend} />
        <Chat_friend key={'sf1v2'} name={'ospjfopjs'} last_message={"skofeksf"} uid={'14'} onClick={On_Chat_friend} />
      </BoxCards>

      <div className='Chat-section' ref={Chat_Conversation_Ref}>

        <Chat_optionBar />

        <StyledChatConversation>
          {/* <ul className='Chat-Conversation'> */}
          {/* <div className="Chat_conversation">
          {USERdata.map((data, key) => {
            return <Chat_message {...data} />
          })}
        </div> */}

          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          <li className="Chat-massage-coversation">
            <Chat_message id={'1312312'} from_id={'1312312'} message={'1312312'} timest={'1312312'} />
          </li>
          {/* </ul> */}
        </StyledChatConversation>
        <div className='ta-frame' >
          <IconButton variant="contained" title="More"><MoreHorizIcon /></IconButton>
          <IconButton variant="contained" title="Emoji"><TagFacesIcon /></IconButton>
          <StyledTextField defaultValue="Hello World" multiline={true} maxRows={2} ref={Chat_textfield_Ref} onKeyDown={TextFieldOnKeyDown} />
          <Button variant="contained" onClick={test}><SendIcon /></Button>
        </div>
      </div>
    </div >
  )
}
export default Chat_content;