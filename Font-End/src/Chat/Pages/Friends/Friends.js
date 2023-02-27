import './Friends.css'
import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FriendCard from './Components/FreindCard';
import FriendContent from './Components/Content';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { StyledAddFriendIconButton, StyledNavItemBage } from '../../styles';
import { useNavigate } from 'react-router-dom';



const Friends = () => {
  const { pathname } = useLocation();
  const pathnamelowcase = pathname.toLowerCase();
  const Navigate = useNavigate();
  return (
    <div className='Friends-main'>
      <div className='Friends-Content-Headers'>
        <SSearch style={{
          width: `100%`,
          marginBottom: '.35rem'
        }}>
          <SSearchIcon>
            <SearchOutlinedIcon />
          </SSearchIcon>
          <input
            placeholder={`Search ${pathnamelowcase === '/home/friend/friends' ? 'Friends' : pathnamelowcase === '/home/friend/request' ? 'Request' : 'Favorites'}`}
          />
          <StyledAddFriendIconButton aria-label={'0'} onClick={() => Navigate('../Invite')} >
            <PersonAddAlt1Icon />
          </StyledAddFriendIconButton>
        </SSearch>
        <div className='Friend-Nav'>
          <Link to={'Friends'} className={`Nav-item ${pathnamelowcase === '/home/friend/friends' ? 'Active' : ''}`} >Friends</Link>
          <Link to={'Favorites'} className={`Nav-item ${pathnamelowcase === '/home/friend/favorites' ? 'Active' : ''}`} >Favorites</Link>
          <StyledNavItemBage badgeContent={100} color="secondary">
            <Link to={'Request'} className={`Nav-item ${pathnamelowcase === '/home/friend/request' ? 'Active' : ''}`} >Request</Link>
          </StyledNavItemBage>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Friends;