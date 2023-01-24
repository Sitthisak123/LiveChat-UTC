import './Login.css';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const Login = () => {
  const activeLink = "header-login-item-active";
  const normalLink = "header-login-item";
  const [useElem_state, setElem_state] = useState({
    email: "",
    password: ""
  });
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