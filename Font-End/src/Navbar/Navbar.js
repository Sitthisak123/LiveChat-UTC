import './Navbar.css';
import Logo from '../_assets/img/logo192.png';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  const activeLink = "Nav-item Nav-item-active"
  const normalLink = "Nav-item"
  return (
    <div className="Navbar">
      <div className="Nav-Logo">
        <img src={Logo} alt="logo"/>
        <p>Logo & Name</p>
      </div>
      <div className="Nav-menu">
        <NavLink className={({isActive}) => isActive ? activeLink:normalLink } 
        to="profile"> Profile </NavLink>

        <NavLink className={({isActive}) => isActive ? activeLink:normalLink } 
        to="chat"> Chat </NavLink>

        <NavLink className={({isActive}) => isActive ? activeLink:normalLink } 
        to="friends"> Friends </NavLink>

        <NavLink className={({isActive}) => isActive ? activeLink:normalLink } 
        to="settings"> { <SettingsIcon sx={{ fontSize: 35 }} className="Nav-item-Icon" />} </NavLink>
        
      </div>
    </div>
    )
}

export default Navbar;