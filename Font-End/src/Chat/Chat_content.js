/* eslint-disable react/jsx-pascal-case */
import { useRef, useEffect, useContext, createContext, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from 'axios';

import './Chat_content.css';
import Home from '../Home/Home.js';
import Chat from './Pages/Conversation/Chat.js';
import { BoxCards, ChatContentSection } from './styles';


import { useMediaQuery } from '@react-hook/media-query';
export const ChatContext = createContext();

const Chat_content = () => {
  const [Chat_state, setChat_state] = useState({ uid: null, cid: null, pageState: false });
  const isSmallScreen = useMediaQuery('(max-width: 780px)');
  const BoxCards_ref = useRef();
  const Chat_ref = useRef();
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    const chatContent = document.querySelector('.Chat_content-section');
    const mainContent = document.querySelector('main');

    if (isSmallScreen && Chat_state.pageState) {
      BoxCards_ref.current.style.display = 'none';
      Chat_ref.current.style.display = '';
      sidebar.style.display = "none";
      sidebar.style.zIndex = "0";

      chatContent.style.minHeight = '100%';
      mainContent.style.minHeight = '100%';
      chatContent.style.position = 'fixed';
      chatContent.style.bottom = '0';
    } else if (isSmallScreen && !Chat_state.pageState) {
      setChat_state({});
      BoxCards_ref.current.style.display = '';
      Chat_ref.current.style.display = '';
      mainContent.style.minHeight = `calc(100vh - ${Response.sidebar})`;

      sidebar.style.display = "";
      sidebar.style.zIndex = "";

    } else if (!isSmallScreen) {
      BoxCards_ref.current.style.display = '';
      Chat_ref.current.style.display = '';
      sidebar.style.display = "";

      chatContent.style.minHeight = `100vh`;
      chatContent.style.position = `relative`;

      setChat_state({ ...Chat_state, pageState: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallScreen, Chat_state.pageState])
  return (
    <ChatContext.Provider value={{ Chat_state, setChat_state }}>
      <Home >
        {
          isSmallScreen
            ?
            <ChatContentSection>
              <BoxCards ref={BoxCards_ref}>
                <Outlet />
              </BoxCards>             
                <div className='Chat-section' ref={Chat_ref}>
                  <Chat />
                </div>
            </ChatContentSection>
            :
            <ChatContentSection>
              <BoxCards ref={BoxCards_ref}>
                <Outlet />
              </BoxCards>
              <div className='Chat-section' ref={Chat_ref}>
                <Chat />
              </div>
            </ChatContentSection>
        }
      </ Home>
    </ChatContext.Provider>
  )
}
export default Chat_content;