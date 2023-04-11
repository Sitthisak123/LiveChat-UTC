import './Service.css';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER } from '../_stores/Slices/user.js';
import { useNavigate } from 'react-router-dom';
const Service = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const User_data = useSelector((state) => ({ ...state }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
  if (TOKEN) {
    dispatch(CREATE_USER(TOKEN));
    Navigate("/Auth");
  }
  return (
    <div className='Service-page'>
      <form className='Form-Service'>
        {<Outlet />}
      </form>
    </div>
  )
}
export default Service;