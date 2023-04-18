import { createContext, useEffect, useState } from "react";

import { MainStyled, OptionBarStyled, SideBarStyled, AppLayOutStyled } from "./main-styled";
import OptionBar from "./optionBar/optionBar";
import SideBar from "./sideBar/sideBar";
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:9001';

const Main = () => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState(0);
    useEffect(() => {
        const newSocket = io(ENDPOINT, {
          // pass the token in the headers field
          extraHeaders: {
            'access-token-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2VtYWlsIjoiamFtZXMyNTEyNTMzNzAxN0BnbWFpbC5jb20iLCJpYXQiOjE2ODE3OTYzOTEsImV4cCI6MTY4MTgzMjM5MX0.QuqJh7AQXyPn38kxvyGAIDDkv-IeHjS4CWiHXvZ0lbw',
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
                <h1>Online: {onlineUser}</h1>
            </MainStyled>

        </AppLayOutStyled>
    )
}

export default Main;