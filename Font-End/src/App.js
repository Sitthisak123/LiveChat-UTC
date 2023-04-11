import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Profile from './Chat/Pages/Profile/Profile.js';
import Conversation from './Chat/Pages/Conversation/Conversation.js';
import Friends from './Chat/Pages/Friends/Friends.js';
import Settings from './Chat/Pages/Setting/Setting.js';
import Chatcontent from './Chat/Chat_content.js';
import Login from './Login/Login.js';
import Signin from './Login/pages/Signin.js';
import Signup from './Login/pages/Signup.js';
import { useState, createContext, useEffect } from 'react';
import Redirect from './_methods/Redirect.js';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import { store } from './_stores/Stores.js';
import { Provider } from 'react-redux';
import FriendContent from './Chat/Pages/Friends/Components/Content.js';
import AddFriend from './Chat/Pages/Friends/AddFriend.js';
import Auth from './Middleware/Auth.js';
import Account from './Chat/Pages/Setting/Sub/Accout.js';
import Chats from './Chat/Pages/Setting/Sub/Chats.js';
import Friend from './Chat/Pages/Setting/Sub/Friends.js';
import Language from './Chat/Pages/Setting/Sub/Language.js';
import Theme from './Chat/Pages/Setting/Sub/Theme.js';
import FriendBlockedManage from './Chat/Pages/Setting/Sub/Sub/Friend-Blocked_Manage.js';
import Service from './Services/Service.js';
import ForgotPassword from './Services/Sub/ForgotPassword.js';
import ChangePassword from './Services/Sub/ChangePassword.js';
/*-------------------Test -------------*/
// import ImageUpload from './Test.js';
/* //////////////////////////////////// */

export const ThemeContext = createContext();

function App() {
  const initTheme = JSON.parse(localStorage.getItem('system'));
  const currentTheme = initTheme?.theme;
  const [theme, setTheme] = useState(currentTheme === "light" || currentTheme === "dark" ? currentTheme : 'light');
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  useEffect(() => {
    localStorage.setItem('system', JSON.stringify({ theme }))
  }, [theme]);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <GlobalStyle />
          <Helmet>
            <title>LiveChat-UTC</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          </Helmet>
          <Routes>

            <Route path="Auth/*" element={<Auth />} />
            <Route path="Services/*" element={<Service />}>
              <Route path="ChangePassword" element={<ChangePassword />} />
              <Route path="ForgotPassword" element={<ForgotPassword />} />

            </Route>

            <Route path="Home/*" element={<Chatcontent />}>
              <Route path="Test/*" element={<FriendBlockedManage />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Chat" element={<Conversation />} />
              <Route path="Friend/Invite" element={<AddFriend />} />
              <Route path="Friend/*" element={<Friends />} >
                <Route path="Friends" element={<FriendContent />} />
                <Route path="Favorites" element={<FriendContent />} />
                <Route path="Request" element={<FriendContent />} />
                <Route path="*" element={<Redirect value={"Friends"} />} />
              </Route>

              <Route path="Settings/*" element={<Settings />} >
                <Route path="Account" element={<Account />} />
                <Route path="Chats" element={<Chats />} />
                <Route path="Friends" element={<Friend />} />
                <Route path="Language" element={<Language />} />
                <Route path="Theme" element={<Theme />} />

                <Route path="Blocked-Manage" element={<FriendBlockedManage />} />

              </Route>
              <Route path="*" element={<Redirect value={"Profile"} />} />
            </Route>

            <Route path="Login/*" element={<Login />} >
              <Route path="Signin" element={<Signin />} />
              <Route path="Signup" element={<Signup />} />
              <Route path="*" element={<Redirect value={"Signin"} />} />
            </Route>
            <Route path="*" element={<Redirect value={"Login"} />} />
          </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
