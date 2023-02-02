import './Login.css';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { USERContext, AppDataContext } from '../App.js';

const Login = () => {
  const activeLink = "header-login-item-active";
  const normalLink = "header-login-item";

  // eslint-disable-next-line no-unused-vars
  const USER_data = useContext(USERContext);
  // eslint-disable-next-line no-unused-vars
  const App_Data= useContext(AppDataContext);
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const handleLogin = (data, token) => {
    // setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  }
  return (
    <div className='Login-page'>
      <form className='Form-login'>
        <div className='Header-login'>
          <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="Signup"> Sign Up </NavLink>
          <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="Signin"> Sign In </NavLink>
        </div>
          {<Outlet />}
      </form>
    </div>
  )
}
export default Login;