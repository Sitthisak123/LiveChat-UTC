import { useRef, useContext, useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TagFacesIcon from '@mui/icons-material/TagFaces';

import Chatmessage from './components/Chat_message.js';
import ChatoptionBar from './components/Chat_option-bar.js';
import { StyledChatConversation, StyledTextField, StyledIconButton, StyledButton } from '../../styles.js';

import { ChatContext } from '../../Chat_content.js';
import { SocketMethod } from '../../../Home/Home.js';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../../../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../../../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG } from '../../../_stores/Slices/chat_msg.js';

const Chat = () => {
    const { Chat_state, setChat_state } = useContext(ChatContext);
    const dispatch = useDispatch();
    const { Chat_data_msg, Chat_data_users } = useSelector((state) => ({ ...state }));
    const { socket_sendMessage } = useContext(SocketMethod);

    /////////////////////////////////// TextAria ///////////////////////////////////////////
    const [text, setText] = useState('');
    const textareaRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [emojiLength, setEmojiLength] = useState(0);
    const addEmoji = (emoji) => () => {
        const emojiLength = emoji.length;
        const newText = `${text.slice(0, cursorPosition)}${emoji}${text.slice(cursorPosition)}`;
        setText(newText);
        setCursorPosition(cursorPosition + emojiLength);
        setEmojiLength(emojiLength);
        const textareaDom = textareaRef.current.querySelector('textarea');
        textareaDom.focus();
        textareaDom.setRangeText(emoji, cursorPosition, cursorPosition, "end");
        textareaDom.setSelectionRange(cursorPosition + emojiLength, cursorPosition + emojiLength);
    };
    const handleTextareaKeyDown = (event) => {
        if (event.key === 'Backspace') {
            setCursorPosition(cursorPosition - emojiLength);
            setEmojiLength(0);
        }
    };
    const handleTextareaChange = (event) => {
        setText(event.target.value);
    };

    const handleTextareaSelect = (event) => {
        setCursorPosition(event.target.selectionStart);
    };

    /////////////////////////////////////////////////////////////////////////////////////////
    const Chat_textfield_Ref = useRef();

    function TextFieldOnKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }



    if (!(Chat_state.cid && Chat_state.uid)) {
        return <button>GET START YOUR CHAT</button>
    }
    const name = Chat_data_users.users.find(user => user.user_id === Chat_state.uid).user_name;

    return (
        <>
            <ChatoptionBar />

            <StyledChatConversation>
                {
                    Chat_data_msg.chat_msg.map((data) => {
                        // const name = 
                        if (data.fk_chat_id === Chat_state.cid) {
                            return (
                                <div className="Chat-massage-coversation">
                                    <Chatmessage
                                        id={data.msg_reply_id}
                                        msg_type={data.msg_type}
                                        from_id={data.fk_user_owner}
                                        message={data.msg_reply_message}
                                        timest={data.msg_createTime}
                                        readed={data.msg_read}
                                        name={name}
                                    />
                                </div>
                            )
                        }
                    })
                }

            </StyledChatConversation>
            <div className='ta-frame' >
                <StyledIconButton variant="contained" title="More"><MoreHorizIcon /></StyledIconButton>
                <StyledIconButton variant="contained" title="Emoji"><TagFacesIcon /></StyledIconButton>
                <StyledTextField
                    defaultValue=""
                    multiline={true}
                    maxRows={4}
                    ref={Chat_textfield_Ref}
                    onKeyDown={handleTextareaKeyDown}
                    onSelect={handleTextareaSelect}
                    onChange={handleTextareaChange}
                />
                <StyledButton variant="contained" onClick={() => socket_sendMessage(text, Chat_state.uid, Chat_state.cid)}><SendIcon /></StyledButton>
            </div>
        </>
    )
}
export default Chat;