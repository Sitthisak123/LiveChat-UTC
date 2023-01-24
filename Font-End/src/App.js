/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile.js';
import Chat from './Chat/Chat.js';
import Friends from './Friends/Friends.js';
import Settings from './Settings/Settings.js';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Signin from './Login/pages/Signin.js';
import Signup from './Login/pages/Signup.js';
import { useEffect, useContext } from 'react';
import { USERContext, AppDataContext } from './_data_provider/Chat.js';
function Redirect(prop) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(prop.value);
  }, []);
  return null;
}
function reducer_USER(USER_state, USER_action) {
  if (USER_action.type === "logout") {
    return
  } else if (USER_action.type === "logout") {
    return
  }
  return
}


function App() {
  const USER_data = [];
  const APP_data = [];
  return (
    <AppDataContext.Provider value={APP_data}>
      <USERContext.Provider value={USER_data}>
        <Routes>
          <Route path="Home" element={<Home />}>
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="friends" element={<Friends />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Redirect value={"profile"} />} />
          </Route>
          <Route path="Login" element={<Login />} >
            <Route path="Signin" element={<Signin />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="*" element={<Redirect value={"Signin"} />} />
          </Route>
          <Route path="/" element={<Redirect value={"home/profile"} />} />
        </Routes>
      </USERContext.Provider>
    </AppDataContext.Provider>
  );
}

export default App;
