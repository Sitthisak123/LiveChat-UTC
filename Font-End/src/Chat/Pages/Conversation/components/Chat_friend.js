import './Chat_friend.css';
import { forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { StyledBadge, StyledCardHeader, StyledCard } from '../../../styles.js';
import { useMediaQuery } from '@react-hook/media-query';

const Chat_friend = forwardRef((props, ref) => {
  const { key, name, last_message, uid, cid, isActive, image } = props;
  const isSmallScreen = useMediaQuery('(max-width: 780px)');

  function handleClick() {
    if(isSmallScreen){
      props.onClick({uid,cid,pageState: true});
    }else{
      props.onClick({uid,cid,pageState: false});
    }
  }
  return (
    <StyledCard isActive={isActive} onClick={handleClick}>
      <StyledCardHeader
        avatar={
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar alt={`${name}_${uid}`} src={`http://localhost:9001/user/image/${uid}/${image}`} />
          </StyledBadge>
        }
        title={name}
        subheader={last_message}
      />
    </StyledCard>
  )
})
export default Chat_friend;