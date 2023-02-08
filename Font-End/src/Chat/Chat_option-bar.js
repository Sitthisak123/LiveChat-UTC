import './Chat.css';
import { StyledCardHeaderOptionbar, StyledBadge } from './styles';
import { Avatar } from '@mui/material';
import img from '../_assets/1.jpg';
import Card from '@mui/material/Card';

const Chat_optionBar = () => {
  return (
    <div className="Chat_option-bar">
      <Card>
        <StyledCardHeaderOptionbar 
          sx={{backgroundColor: `${({ theme }) => theme.primary}`}}
          avatar={
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
              <Avatar alt="Remy Sharp" src={img} />
            </StyledBadge>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
      </Card>
    </div>
  )
}
export default Chat_optionBar;