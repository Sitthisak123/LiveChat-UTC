import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Profile from './Profile/Profile.js';
import Chat from './Chat/Chat.js';
import Friends from './Friends/Friends.js';
import Settings from './Settings/Settings.js';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Signin from './Login/pages/Signin.js';
import Signup from './Login/pages/Signup.js';
import { useState, createContext } from 'react';
import { USERContext, AppDataContext } from './_data_provider/Chat.js';
import Redirect from './_methods/Redirect.js';
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;

  const [useUserData, setUserData] = useState({});
  const [useAppData, setAppData] = useState({});
  return (
    <USERContext.Provider value={{ useUserData, setUserData }}>
      <AppDataContext.Provider value={{ useAppData, setAppData }}>
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
              <Route path="Home/*" element={<Home />}>

                <Route path="1" element={<h1>1 Home Page</h1>} />
                <Route path="2" element={<h1>2 Statistics Page</h1>} />
                <Route path="3" element={<h1>3 Customers Page</h1>} />
                <Route path="4" element={<h1>4 Diagrams Page</h1>} />

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
          </ThemeProvider>
        </ThemeContext.Provider>
      </AppDataContext.Provider>
    </USERContext.Provider>
  );
}

export default App;
