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
    <StyledCard>
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

  // return (
  //   <div className="Chat_friend-card" id-key={key} onClick={handleClick} ref={ref}>
  //     <div className="Chat_friend-img">
  //       <img src={logo} />
  //       <span className="Chat_friend-status"></span>
  //     </div>
  //     <div className="Chat_details">
  //       <div className="Chat_name_n_time">
  //         <p className="Chat_friend-name">
  //           {name}
  //         </p>
  //         <p className="Chat_friend-last-msg">
  //           {last_message}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // )
})
export default Chat_friend;