import './Chat_friend.css';
import img from '../../../../_assets/1.jpg';
import { forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { StyledBadge, StyledCardHeader, StyledCard } from '../../../styles.js';


const Chat_friend = forwardRef((props, ref) => {
  const { key, name, last_message, uid, cid, isActive } = props;
  function handleClick() {

    props.onClick({uid,cid});
  }
  return (
    <StyledCard isActive={isActive} onClick={handleClick}>
      <StyledCardHeader
        avatar={
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar alt="Remy Sharp" src={img} />
          </StyledBadge>
        }
        title={name}
        subheader={last_message}
      />
    </StyledCard>
  )
})
export default Chat_friend;