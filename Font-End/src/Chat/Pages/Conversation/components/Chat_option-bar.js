import './Chat_option-bar.css';
import { StyledCardHeaderOptionbar, StyledBadge, ChatSection } from '../../../styles';
import { Avatar } from '@mui/material';
import img from '../../../../_assets/1.jpg';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { StyledIconButton } from '../../../styles';
import { useMediaQuery } from '@react-hook/media-query';
import { ChatContext } from '../../../Chat_content';
import { useContext } from 'react';

const Chat_optionBar = ({ porps }) => {
  const isSmallScreen = useMediaQuery('(max-width: 780px)');
  const { Chat_state, setChat_state } = useContext(ChatContext);
  function Back_onClick(){
    setChat_state({pageState: false});
  }
  return (
    <ChatSection>
      {
        isSmallScreen
        ?
          <StyledIconButton onClick={Back_onClick}>
            <ArrowBackIosNewOutlinedIcon color='primary' />
          </StyledIconButton>
        :
          null
      }
      <StyledCardHeaderOptionbar
        avatar={
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
            <Avatar alt="Remy Sharp" src={img} />
          </StyledBadge>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      ></StyledCardHeaderOptionbar>
    </ChatSection>
  )
}
export default Chat_optionBar;