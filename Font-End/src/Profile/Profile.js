// import Axios from 'axios';
// import { useState } from 'react';


// const Profile = () => {
//   const [useUser, setUser] = useState([]);

//   const getAlluser = () => {
//     Axios.get("http://localhost:9000/getalluser").then((response) => {
//       setUser(response.data)
//       console.log(response.data)
//     })
//   }
//   return (
//     <>
//       <button onClick={getAlluser} > {"Hello"} </button>
//     </>
//   )
// }
// export default Profile;

// TextArea for Chat Message
import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

export default function TextareaDecorators() {
  const [text, setText] = React.useState('');
  const textareaRef = React.useRef(null);
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const [emojiLength, setEmojiLength] = React.useState(0);

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

  return (
    <Textarea
      ref={textareaRef}
      placeholder="Type in here…"
      value={text}
      onChange={handleTextareaChange}
      onSelect={handleTextareaSelect}
      onKeyDown={handleTextareaKeyDown}
      minRows={2}
      maxRows={4}
      startDecorator={
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
            👍
          </IconButton>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
            🏖
          </IconButton>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
            😍
          </IconButton>
        </Box>
      }
      endDecorator={
        <Typography level="body3" sx={{ ml: 'auto' }}>
          {text.length} character(s)
        </Typography>
      }
      sx={{ minWidth: 300 }}
    />
  );

}
