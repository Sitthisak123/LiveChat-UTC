import { Routes, Route } from 'react-router-dom';
import Profile from './Profile/Profile.js';
import Chat from './Chat/Chat.js';
import Friends from './Friends/Friends.js';
import Settings from './Settings/Settings.js';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Signin from './Login/pages/Signin.js';
import Signup from './Login/pages/Signup.js';
import { useState } from 'react';
import { USERContext, AppDataContext } from './_data_provider/Chat.js';
import Redirect from './_methods/Redirect.js';


function App() {
  const [useUserData, setUserData] = useState({});
  const [useAppData, setAppData] = useState({});
  return (
    <USERContext.Provider value={{ useUserData, setUserData }}>
      <AppDataContext.Provider value={{ useAppData, setAppData }}>
        <Routes>
          <Route path="Home/*" element={<Home />}>
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="friends" element={<Friends />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Redirect value={"profile"} />} />
          </Route>
          <Route path="Login/*" element={<Login />} >
            <Route path="Signin" element={<Signin />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="*" element={<Redirect value={"Signin"} />} />
          </Route>
          <Route path="*" element={<Redirect value={"Login"} />} />
        </Routes>
      </AppDataContext.Provider>
    </USERContext.Provider>
  );
}

export default App;
