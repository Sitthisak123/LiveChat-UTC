import './Login.css';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER } from '../_stores/Slices/user.js';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const activeLink = "header-login-item-active";
  const normalLink = "header-login-item";
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User_data = useSelector((state) => ({ ...state }));
  const [hasRun, setHasRun] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    dispatch(CREATE_USER(user));
    Navigate("/Home");
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