import { forceUpdate } from "react";
import Auth from "../Middleware/Auth.js";
import Sidebar from "./Sidebar/Sidebar.js";
import { SLayout, SMain } from "./styles.js";
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER } from '../_stores/Slices/user.js';
import { useNavigate } from 'react-router-dom';

const Home = ({ children }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
  console.log(TOKEN)
  const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg } = useSelector((state) => ({ ...state }));
  if (!TOKEN || User_data.value.length < 1) {
    Navigate("/Auth");
  }
  return (
    <SLayout>
      <Sidebar />
      <SMain>{ children }</SMain>
    </SLayout>
  )
}
export default Home;