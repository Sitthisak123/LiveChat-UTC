import './Friends.css'
import { createContext, useEffect, useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { SSearch, SSearchIcon } from '../../../Home/Sidebar/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FriendCard from './Components/FreindCard';
import FriendContent from './Components/Content';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { StyledAddFriendIconButton, StyledNavItemBage } from '../../styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SearchText = createContext(null);

const Friends = () => {
  const { pathname } = useLocation();
  const pathnamelowcase = pathname.toLowerCase();
  const Navigate = useNavigate();
  const [textinput, setTextInput] = useState(null);
  const handleClickLink = (event) => {
    setTextInput('');
  }
  const { Friends_relation, User_data, Ch } = useSelector((state) => ({ ...state }))
  const [ request, setRequest ] = useState(0);
  useEffect(() => {
    const count = Friends_relation.Friend_data.reduce((acc, friend) => {
      if (friend.relation_status === 3 && friend.fk_user_one !== User_data.value.user_id) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setRequest(count)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Friends_relation.Friend_data]);
  return (
    <div className='Friends-main' >
      <div className='Friends-Content-Headers'>
        <SSearch style={{
          width: `100%`,
          marginBottom: '.35rem'
        }}>
          <SSearchIcon>
            <SearchOutlinedIcon />
          </SSearchIcon>
          <input
            onChange={(event) => setTextInput(event.target.value)}
            value={textinput}
            placeholder={`Search ${pathnamelowcase === '/home/friend/friends' ? 'Friends' : pathnamelowcase === '/home/friend/request' ? 'Request' : 'Favorites'}`}
          />
          <StyledAddFriendIconButton aria-label={'0'} onClick={() => Navigate('Invite')} >
            <PersonAddAlt1Icon />
          </StyledAddFriendIconButton>
        </SSearch>
        <div className='Friend-Nav'>
          <Link onClick={handleClickLink} to={'Friends'} className={`Nav-item ${pathnamelowcase === '/home/friend/friends' ? 'Active' : ''}`} >Friends</Link>
          <Link onClick={handleClickLink} to={'Favorites'} className={`Nav-item ${pathnamelowcase === '/home/friend/favorites' ? 'Active' : ''}`} >Favorites</Link>
          <StyledNavItemBage badgeContent={request} color="secondary">
            <Link onClick={handleClickLink} to={'Request'} className={`Nav-item ${pathnamelowcase === '/home/friend/request' ? 'Active' : ''}`} >Request</Link>
          </StyledNavItemBage>
        </div>
      </div>
      <SearchText.Provider value={{ textinput, setTextInput }}>
        <Outlet />
      </SearchText.Provider>
    </div>
  )
}

export default Friends;
