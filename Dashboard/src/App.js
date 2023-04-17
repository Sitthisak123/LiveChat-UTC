import { Routes, Route } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useState, createContext, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';

import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";

///// Component \\\\\\
import Redirect from './_methods/Redirect.js';
import Main from './Pages/Main/main.js';


export const ThemeContext = createContext();

function App() {
  const initTheme = JSON.parse(localStorage.getItem('system'));
  const currentTheme = initTheme?.theme;
  const [theme, setTheme] = useState(currentTheme === "light" || currentTheme === "dark" ? currentTheme : 'light');
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  return (
    <>
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
            <Route path="Auth/*" element={<h1>Auth</h1>} />
            <Route path="Login/*" element={<h1>Login</h1>} />
            <Route path="Main/*" element={<Main />} />
            <Route path="*" element={<Redirect value={"Auth"} />} />
          </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
