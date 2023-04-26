import './Chat_friend.css';
import { forwardRef, useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { StyledBadge, StyledCardHeader, StyledCard } from '../../../styles.js';
import { useMediaQuery } from '@react-hook/media-query';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PushPinIcon from '@mui/icons-material/PushPin';
import UndoIcon from '@mui/icons-material/Undo';
import { API_ChangeChatStatus } from '../../../../_APIs/system';
import useErrorHandling from '../../../../_methods/HandleError';
import { UPDATE_CONVERSATION } from '../../../../_stores/Slices/chat_conversation';
import { DELETE_CHAT_MSG_BY_CID } from '../../../../_stores/Slices/chat_msg';
import { useDispatch, useSelector } from 'react-redux';

const Chat_friend = forwardRef((props, ref) => {
  const { key, name, last_message, uid, cid, isActive, image, pinned, action, status } = props;
  const isSmallScreen = useMediaQuery('(max-width: 780px)');
  const [hasCancel, setHasCancel] = useState(false)
  const [onLOAD, setOnload] = useState(false)
  const { User_data } = useSelector((state) => ({ ...state }));
  const { handleErrors } = useErrorHandling();
  const dispatch = useDispatch();

  const handleActions = () => {
    setHasCancel(true);
    setOnload(true);
    const newStatus = action === 1 ? pinned ? 0 : 1 : action === 3 ? action : null;
    API_ChangeChatStatus(User_data.value.user_TOKEN).put('', { newChatStatus: newStatus, cid }).then((response) => {
      setOnload(false);
      console.log(response.data.text);
      if (newStatus === 1 || newStatus === 0) {
        const owner = status.chat_status_one !== false ? { chat_status_one: newStatus } : status.chat_status_two !== false ? { chat_status_two: newStatus } : null
        dispatch(UPDATE_CONVERSATION({ chat_id: cid, ...owner }));
      } else if (newStatus === 3) {
        dispatch(UPDATE_CONVERSATION({ chat_id: cid, chat_open: false }));
        dispatch(DELETE_CHAT_MSG_BY_CID(cid));
      }
    }).catch((error) => {
      setOnload(false);
      console.log(error.response.data);
      handleErrors(error);
    });
  }

  function handleClick() {
    if (hasCancel) {
      setHasCancel(false);
      return
    }
    if (isSmallScreen) {
      props.onClick({ uid, cid, pageState: true });
    } else {
      props.onClick({ uid, cid, pageState: false });
    }
  }
  return (
    <StyledCard key={key} isActive={isActive} onClick={handleClick}>
      <StyledCardHeader

        avatar={
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar alt={`${name}_${uid}`} src={`${process.env.REACT_APP_IMG_URL}${uid}/${image}`} />
          </StyledBadge>
        }
        title={name}
        subheader={last_message}
        action={action === 1 ?
          pinned ?
            <UndoIcon sx={{ cursor: 'pointer' }} onMouseDown={handleActions} />
            :
            <PushPinIcon sx={{ cursor: 'pointer' }} onMouseDown={handleActions} />
          :
          action === 3
            ? <DeleteForeverIcon sx={{ cursor: 'pointer', color: 'red' }} onMouseDown={handleActions} />
            :
            null
        }
      />
    </StyledCard>
  )
})
export default Chat_friend;