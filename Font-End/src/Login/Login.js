import './Login.css';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER } from '../_stores/Slices/user.js';
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { LanguageContext } from '../App';

const Login = () => {
  const activeLink = "header-login-item-active";
  const normalLink = "header-login-item";
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User_data = useSelector((state) => ({ ...state }));
  const { Language } = useContext(LanguageContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
  if (TOKEN) {
    dispatch(CREATE_USER(TOKEN));
    Navigate("/Auth");
  }
  return (
    <div className='Login-page'>
      <form className='Form-login'>
        <div className='Header-login'>
          <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="Signup">{Language.Login.signup}</NavLink>
          <NavLink className={({ isActive }) => isActive ? activeLink : normalLink} to="Signin">{Language.Login.signin}</NavLink>
        </div>
        {<Outlet />}
      </form>
    </div>
  )
}
export default Login;