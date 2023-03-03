import './FreindCard.css';
import { StyledCard, StyledCardHeader, StyledBadge, StyledFriendActionIconButton } from "../../../styles";
import { Avatar } from "@mui/material";
import img from '../../../../_assets/1.jpg';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { pink } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
const FriendCard = ({ props }) => {
    //  const { Cardtype } = props; // 1,2 = friend, 3 =
    const Cardtype = 3;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClosewith = () => {
        /////////// code
        setAnchorEl(null);
    };

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
                        {
                            (Cardtype === 1 || Cardtype === 2) ?
                                <div className='Card-Action'>
                                    <StyledFriendActionIconButton><DoneIcon color='success' /></StyledFriendActionIconButton>
                                    <StyledFriendActionIconButton><ClearIcon sx={{ color: pink[500] }} /></StyledFriendActionIconButton>
                                </div>
                                :
                                <div className='Card-Action'>
                                    <StyledFriendActionIconButton onClick={handleClick}><MoreHorizIcon /></StyledFriendActionIconButton>
                                </div>
                        }

                    </div>
                }
                subheader=''
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClosewith} disableRipple>Profile</MenuItem>
                <MenuItem onClick={handleClosewith} disableRipple>Block</MenuItem>
                <MenuItem onClick={handleClosewith} disableRipple>Delete</MenuItem>
            </Menu>
        </StyledCard>
    );
}
export default FriendCard;