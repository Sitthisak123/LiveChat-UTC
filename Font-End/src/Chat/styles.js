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
    min-width: 22rem;
    max-width: 22rem;
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
      background-color:  ${({ isActive }) => (isActive ? `grey !important` : `transparent !important`)} ;
      user-select: none;
      max-height: ;
      :hover > div {
        /* background-Color: ${({ theme }) => theme.fcard_hover} !important; */
        background-Color: ${({ isActive }) => (isActive ? `unset` : `${({ theme }) => theme.fcard_hover} !importan`)};
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
      background-color: ${({ theme }) => theme.bgAlpha2};
      backdrop-filter: blur(1px);
      box-shadow: 0px 4px 8px ${({ theme }) => theme.bgAlpha};
      border-bottom: .1px solid black;
      max-width: 100%;
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

export const StyledChatConversation = styled.div`
  grid-area: Chat;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  padding: 1rem;
  overflow: hidden;
  overflow-y: auto;
`;

