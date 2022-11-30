import './Chat_TextField.css';
import TextareaAutosize from '@mui/base/TextareaAutosize';


const Chat_TextField = () => {
  return(
    <>
    <TextareaAutosize
      className="Chat_TextField"
      placeholder="Type a message"
      minRows={1}
      maxRows={12}
    />
    </>
    )
}
export default Chat_TextField;