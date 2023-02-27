import './FreindCard.css';
import { StyledCard, StyledCardHeader, StyledBadge, StyledFriendActionIconButton } from "../../../styles";
import { Avatar } from "@mui/material";
import img from '../../../../_assets/1.jpg';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const FriendCard = ({ props }) => {
    return (
        <StyledCard>
            <StyledCardHeader
                avatar={
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                        <Avatar alt="Remy Sharp" src={img} />
                    </StyledBadge>
                }
                title={
                    <div className="Card-Content">
                        <p>12345678912345678912</p>
                        <div className='Card-Action'>
                        <StyledFriendActionIconButton><DoneIcon /></StyledFriendActionIconButton>
                        <StyledFriendActionIconButton><ClearIcon /></StyledFriendActionIconButton>
                        </div>
                    </div>
                }
                subheader={''}
            />
        </StyledCard>
    );
}
export default FriendCard;