import { createContext, useEffect, useState } from "react";

import {
  MainStyled,
  OptionBarStyled,
  SideBarStyled,
  AppLayOutStyled,
  MainContentStyled,
} from "./main-styled";
import OptionBar from "./optionBar/optionBar";
import SideBar from "./sideBar/sideBar";
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import IconBreadcrumbs from "./sideBar/Componenta/BreadCrumb";
const ENDPOINT = `${process.env.REACT_APP_SOCKET_PORT}`;
export const UserOnline = createContext();

const Main = () => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState(0);
  const Navigate = useNavigate();
  const { admin_Store } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
    if (!TOKEN || admin_Store.admin_data.length < 1) {
      Navigate("/Login");
    }
  }, [])

  useEffect(() => {
    const newSocket = io(ENDPOINT, {
      // pass the token in the headers field
      extraHeaders: {
        'access-token-key': admin_Store.admin_data.admin_TOKEN,
      }
    });
    // Assuming you have access to the user_id value on the client-side
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('Update-onlineUser', (data) => {
      console.log(data);
      setOnlineUser(data)
    });

    return () => socket.off('send');
  }, [socket]);

  return (
    <AppLayOutStyled>
      <SideBarStyled>
        <SideBar />
      </SideBarStyled>

      <MainStyled>
        <OptionBarStyled>
          <OptionBar />
        </OptionBarStyled>

        <IconBreadcrumbs />
        <UserOnline.Provider value={{onlineUser}}>
          <MainContentStyled >
            <Outlet />
          </MainContentStyled>
        </UserOnline.Provider>
      </MainStyled>

    </AppLayOutStyled>
  )
}

export default Main;