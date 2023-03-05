import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Profile from './Chat/Pages/Profile/Profile.js';
import Conversation from './Chat/Pages/Conversation/Conversation.js';
import Chat from './Chat/Pages/Conversation/Chat.js';
import Friends from './Chat/Pages/Friends/Friends.js';
import Setting1 from './Settings/Settings.js';
import Chatcontent from './Chat/Chat_content.js';
import Login from './Login/Login.js';
import Signin from './Login/pages/Signin.js';
import Signup from './Login/pages/Signup.js';
import { useState, createContext, useReducer } from 'react';
import Redirect from './_methods/Redirect.js';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import { store } from './_stores/Stores.js';
import { Provider } from 'react-redux';
import FriendContent from './Chat/Pages/Friends/Components/Content.js';
import AddFriend from './Chat/Pages/Friends/AddFriend.js';
import Auth from './Middleware/Auth.js';

/* Test */
import ImageUpload from './Test.js';
/* Test */
export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

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
            
            <Route path="Home/*" element={<Chatcontent />}>
              <Route path="Test/*" element={<ImageUpload />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Chat" element={<Conversation />} />
              <Route path="Invite" element={<AddFriend />} ></Route>
              <Route path="Friend/*" element={<Friends />} >
                <Route path="Friends" element={<FriendContent />} />
                <Route path="Favorites" element={<FriendContent />} />
                <Route path="Request" element={<FriendContent />} />
                <Route path="*" element={<Redirect value={"Friends"} />} />
              </Route>

              <Route path="Settings" element={<Setting1 />} />
              {/* <Route path="*" element={<Redirect value={"Profile"} />} */}

              />
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
