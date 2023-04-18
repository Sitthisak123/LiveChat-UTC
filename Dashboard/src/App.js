import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import { store } from './_stores/Stores.js';
import { Provider } from 'react-redux';

import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";

///// Component \\\\\\
import Redirect from './_methods/Redirect.js';
import Main from './Pages/Main/main.js';
import Login from './Pages/Login/login.js';
import Auth from './Middleware/Auth.js';
import UserDataTable from './Pages/UserManage/UserDataTable.js';



export const ThemeContext = createContext();

function App() {
  const initTheme = JSON.parse(localStorage.getItem('system'));
  const currentTheme = initTheme?.theme;
  const [theme, setTheme] = useState(currentTheme === "light" || currentTheme === "dark" ? currentTheme : 'light');
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ setTheme, theme }}>
        <ThemeProvider theme={themeStyle}>
          <GlobalStyle />
          <Helmet>
            <title>Dashboard</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          </Helmet>
          <Routes>
            <Route path="Auth/*" element={<Auth />} />
            <Route path="Login/*" element={<Login />} />
            <Route path="Main/*" element={<Main />} >
              <Route path="1" element={<h1>RealTime</h1>} />
              <Route path="RealTime" element={<h1>RealTime</h1>} />
              <Route path="Analysis" element={<h1>Analysis</h1>} />
              
              <Route path="DataTable" element={<UserDataTable />} />

            </Route>
            {/* <Route path="*" element={<Redirect value={"Login"} />} /> */}
          </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
