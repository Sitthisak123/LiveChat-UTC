import { useRef, useContext, useState, useEffect } from 'react';

import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TagFacesIcon from '@mui/icons-material/TagFaces';

import Chatmessage from './components/Chat_message.js';
import ChatmessageUnsend from './components/Chat_message unsend.js';
import ChatmessageFILE from './components/Chat_message_FILE.js';
import ChatmessageIMAGE from './components/Chat_message_IMAGE.js';
import ChatoptionBar from './components/Chat_option-bar.js';
import {
    StyledChatConversation,
    StyledTextField,
    StyledIconButton,
    StyledButton,
    StyledTextAreaFrame,
} from '../../styles.js';

import { ChatContext } from '../../Chat_content.js';
import { SocketMethod } from '../../../Home/Home.js';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../../_stores/Slices/user.js';
import { CREATE_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, CLEAR_CONVERSATION } from '../../../_stores/Slices/chat_conversation.js';
import { CREATE_CHAT_USERS, UPDATE_CHAT_USERS, DELETE_CHAT_USERS, CLEAR_CHAT_USERS } from '../../../_stores/Slices/chat_user.js';
import { CREATE_CHAT_MSG, UPDATE_CHAT_MSG, DELETE_CHAT_MSG, CLEAR_CHAT_MSG } from '../../../_stores/Slices/chat_msg.js';
import { API_UploadIMGFile, API_UploadMSGFile } from '../../../_APIs/user.js';

const Chat = (props) => {
    const { Chat_state, setChat_state } = useContext(ChatContext);
    const dispatch = useDispatch();
    const { User_data, Chat_data_msg, Chat_data_users } = useSelector((state) => ({ ...state }));
    const { socket_sendMessage } = useContext(SocketMethod);
    const Chat_textfield_Ref = useRef();
    const Chat_optionbar_Ref = useRef();
    const moreBTN_ref = useRef();
    const inputFiles_ref = useRef();
    const [moreDialog, setMoreDialog] = useState(false);
    const [file, setFile] = useState(null);

    function TextFieldOnKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

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
        } else if (event.key === 'Enter') {
            handleSendMSG();
            event.preventDefault();
        }
    };
    const handleTextareaChange = (event) => {
        setText(event.target.value);
    };

    const handleTextareaSelect = (event) => {
        setCursorPosition(event.target.selectionStart);
    };
    const handleSendMSG = () => {
        Chat_textfield_Ref.current.value = null;
        socket_sendMessage(text, Chat_state.uid, Chat_state.cid);
    }
    const handleSendIMG = () => {
        inputFiles_ref.current.value = null;
        inputFiles_ref.current.id = "MSGImage";
        inputFiles_ref.current.accept = "image/*";
        inputFiles_ref.current.click();
        setMoreDialog(false);
    }
    const handleSendFile = () => {
        inputFiles_ref.current.value = null;
        inputFiles_ref.current.id = "MSGFile";
        inputFiles_ref.current.accept = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt,.zip,.rar";
        inputFiles_ref.current.click();
        setMoreDialog(false);
    }
    const handleFileChange = () => {
        const FILE = inputFiles_ref.current.files[0];
        if (FILE) {
            const formData = new FormData();
            formData.append("file", FILE);

            if (inputFiles_ref.current.id === "MSGImage") {
                API_UploadIMGFile(User_data.value.user_TOKEN, Chat_state.cid).post('', formData).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    alert("Error > Upload MSG Image");
                    console.log(error);
                });
            } else if (inputFiles_ref.current.id === "MSGFile") {
                API_UploadMSGFile(User_data.value.user_TOKEN, Chat_state.cid).post('', formData).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    alert("Error > Upload MSG File");
                    console.log(error);
                });
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////

    if (!(Chat_state.cid && Chat_state.uid)) {
        return <button>GET START YOUR CHAT</button>
    }
    const FriendData = Chat_data_users.users.find(user => user.user_id === Chat_state.uid);

    return (
        <>
            <ChatoptionBar ref={Chat_optionbar_Ref} isOnline={null} CardName={FriendData.user_name} CardID={FriendData.user_id} CardImage={FriendData.user_profile_img} />

            <StyledChatConversation>

                {
                    Chat_data_msg.chat_msg.map((data) => {
                        if (data.fk_chat_id === Chat_state.cid) {
                            if (
                                (data.fk_user_owner === User_data.value.user_id && data.msg_status_owner === 2)
                                ||
                                (data.fk_user_owner === User_data.value.user_id && data.msg_status_owner === 2 && data.msg_status_other === 0)
                                ||
                                (data.fk_user_owner !== User_data.value.user_id && data.msg_status_owner === 2 && data.msg_status_other === 0)
                            ) {
                                return (
                                    <div className="Chat-massage-coversation">
                                        <ChatmessageUnsend
                                            id={data.msg_reply_id}
                                            msg_type={data.msg_type}
                                            from_id={data.fk_user_owner}
                                            message={data.msg_reply_message}
                                            timest={data.msg_createTime}
                                            readed={data.msg_read}
                                            name={FriendData.user_name}
                                            image={FriendData.user_profile_img}
                                        />
                                    </div>
                                )
                            } else if ((data.fk_user_owner === User_data.value.user_id && data.msg_status_owner === 2 && data.msg_status_other === 1)) {
                                alert('Error is True data.fk_user_owner === User_data.value.user_id && data.msg_status_owner === 2 && data.msg_status_other === 1)')
                                // return null;
                            }
                            if (data.msg_type === "TEXT") {
                                return <div className="Chat-massage-coversation">
                                    <Chatmessage
                                        id={data.msg_reply_id}
                                        msg_type={data.msg_type}
                                        from_id={data.fk_user_owner}
                                        message={data.msg_reply_message}
                                        timest={data.msg_createTime}
                                        readed={data.msg_read}
                                        name={FriendData.user_name}
                                        image={FriendData.user_profile_img}
                                    />
                                </div>

                            } else if (data.msg_type === "IMAGE") {
                                return <div className="Chat-massage-coversation">
                                    <ChatmessageIMAGE
                                        id={data.msg_reply_id}
                                        msg_type={data.msg_type}
                                        from_id={data.fk_user_owner}
                                        message={data.msg_reply_message}
                                        timest={data.msg_createTime}
                                        readed={data.msg_read}
                                        name={FriendData.user_name}
                                        image={FriendData.user_profile_img}
                                    />
                                </div>
                            } else if (data.msg_type === "FILE") {
                                return <div className="Chat-massage-coversation">
                                    <ChatmessageFILE
                                        id={data.msg_reply_id}
                                        msg_type={data.msg_type}
                                        from_id={data.fk_user_owner}
                                        message={data.msg_reply_message}
                                        timest={data.msg_createTime}
                                        readed={data.msg_read}
                                        name={FriendData.user_name}
                                        image={FriendData.user_profile_img}
                                    />
                                </div>
                            }
                        }
                    })
                }

            </StyledChatConversation>
            <StyledTextAreaFrame>
                <StyledIconButton ref={moreBTN_ref} onClick={() => setMoreDialog(true)} variant="contained" title="More">
                    <input ref={inputFiles_ref} type="file" onChange={handleFileChange} style={{ display: "none" }} />
                    <MoreHorizIcon />
                </StyledIconButton>
                <StyledIconButton variant="contained" title="Emoji">
                    <TagFacesIcon />
                </StyledIconButton>
                <StyledTextField
                    defaultValue=""
                    multiline={true}
                    maxRows={4}
                    inputRef={Chat_textfield_Ref}
                    onKeyDown={handleTextareaKeyDown}
                    onSelect={handleTextareaSelect}
                    onChange={handleTextareaChange}
                    placeholder={'Type Message.'}
                />
                <StyledButton variant="contained" onClick={handleSendMSG}><SendIcon /></StyledButton>
            </StyledTextAreaFrame>
            <Menu
                id="basic-menu"
                anchorEl={moreBTN_ref.current}
                open={moreDialog}
                onClose={() => setMoreDialog(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "bottom",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleSendFile} disableRipple>File</MenuItem>
                <MenuItem onClick={handleSendIMG} disableRipple>Image</MenuItem>

            </Menu >
        </>
    )
}
export default Chat;