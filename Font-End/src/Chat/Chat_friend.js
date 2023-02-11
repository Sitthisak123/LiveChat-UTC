import './Chat_friend.css';
import img from '../_assets/1.jpg';
import { forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import { StyledBadge, StyledCardHeader, StyledCard } from './styles'


const Chat_friend = forwardRef((props, ref) => {
  const { key, name, last_message, uid } = props;
  function handleClick() {
    props.onClick(uid);
  }
  return (
    <StyledCard onClick={handleClick}>
      <StyledCardHeader
        avatar={
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar alt="Remy Sharp" src={img} />
          </StyledBadge>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </StyledCard>
  )
})
export default Chat_friend;