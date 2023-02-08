// import { styled as styled2 } from '@mui/material';
import Badge from '@mui/material/Badge';
import styled from "styled-components";
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

export const BoxCards = styled.div`
    --thumbBG: #000000;
    --scrollbarBG: #CFD8DC;
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    min-width: 16rem;
    max-width: 16rem;
    height: 100vh;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.bg2};

    ::-webkit-scrollbar {
      width: .6vw;
    }
    ::-webkit-scrollbar-track {
      background: var(--scrollbarBG);
    }
    ::-webkit-scrollbar-thumb {
      background-color: var(--thumbBG);
      border-radius: 6px;
      border: .15vw solid var(--scrollbarBG);
    }
`;
export const StyledCard = styled(Card)`
      min-width: auto;
      padding: .2rem .4rem;
      display: visible;
      border-radius: 0 !important;
      background-color: transparent !important;
      user-select: none;
      max-height: ;
      :hover > div {
        background-Color: ${({ theme }) => theme.fcard_hover} !important;
      }
       > * {
        cursor: default;
      }

`;

export const StyledCardHeader = styled(CardHeader)`
      background-color: ${({ theme }) => theme.bg3};
      border-radius: .8rem;
`;
export const StyledCardHeaderOptionbar = styled(StyledCardHeader)`
      background-color: rgba(0,0,0,.1) !important;
`;


export const StyledBadge = styled(Badge)`
     .MuiBadge-badge{
       background-Color: #44b700;
       color: #44b700;
       /* box-Shadow: 0 0 0 2px ${({ theme }) => theme.primary} ; */
     }
     /* .MuiBadge-badge::after{
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       border-Radius: 50%;
       animation: ripple 1.2s infinite ease-in-out; */
       /* border: 1px solid ${({ theme }) => theme.bg3}; */
     /* content: "";
     }
     @keyframes ripple{
     0%{
       transform: scale(.8);
       opacity: 1;
     },
     100% {
       transform: scale(2.4);
       opacity: 0;
     }
    } */
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const StyledChatConversation = styled.ul`
  /* list-style-type: none;
  border: 1px solid yellow;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  height: auto; */

  grid-area: Chat;
`;

