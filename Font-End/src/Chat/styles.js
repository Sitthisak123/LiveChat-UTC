// import { styled as styled2 } from '@mui/material';
import Badge from '@mui/material/Badge';
import styled from "styled-components";
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Responsive } from '../styles/variables';

export const BoxCards = styled.div`
    --thumbBG: #000000;
    --scrollbarBG: #CFD8DC;
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    min-width: 22rem;
    max-width: 22rem;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
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

    

    @media (max-width: 780px) {
    
    flex-direction: column-reverse;
    height: calc(100% - ${Responsive.sidebar} );
    min-width: 100vw;
    max-width: 100vw;
    position: fixed;
    bottom: 2.7rem;
}
`;
export const StyledCard = styled(Card)`
      max-height: 6rem;
      padding: .2rem .4rem;
      display: visible;
      border-radius: 0 !important;
      background-color:  ${({ isActive }) => (isActive ? `grey !important` : `transparent !important`)} ;
      user-select: none;
      :hover > div {
        /* background-Color: ${({ theme }) => theme.fcard_hover} !important; */
        background-Color: ${({ isActive }) => (!isActive ? `unset` : `${({ theme }) => theme.fcard_hover} !importan`)};
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
      width: 100%;
      background-color: transparent;
`;

export const ChatSection = styled.div`
      display: flex;
      min-width: 100%;
      max-width: 100%;
      background-color: ${({ theme }) => theme.bgAlpha2};
      backdrop-filter: blur(1px);
      box-shadow: 0px 4px 8px ${({ theme }) => theme.bgAlpha};
      border-bottom: .1px solid black;
`

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
  padding: .5rem;
  overflow: hidden;
  overflow-y: auto;
`;
export const StyledIconButton = styled(IconButton)`


`;

export const StyledButton = styled(Button)`

`;

export const ChatContentSection = styled.div.attrs(props => ({
  className: props.className || 'Chat_content-section'
}))`
  display: flex;
  flex-flow: nowrap;
  width: 100%;
  max-height: 100%;
  min-height: 100vh;
  @media (max-width: 780px) {
    min-height: calc(100vh - ${Responsive.sidebar});
}
`;
export const StyledProfileMedia = styled.div`
    /* display: none; */
    margin-top: 1rem;
    background-color: rgba(0,0,0,.1);
    padding: 5px;
    border: 1px solid transparent;
    height: 100%;
    width: 100%;
    bottom: ${Responsive.sidebar};
`;

export const StyledProfileImage = styled.img`
    position: absolute;
    top: 8rem;
    width: 8rem;
    height: 8rem;
    left: calc(50% - 4rem);
    border-radius: 50%;
    border: .3rem solid ${({ theme }) => theme.bg};
    /* background-color: ${({ theme }) => theme.bg}; */
`;
export const StyledAddFriendIconButton = styled(IconButton)`
  padding: 0;
  :first-child{
    padding: 1rem;
  }
`;
export const StyledFriendActionIconButton = styled(IconButton)`
  border-radius: 0 !important;
  padding: 0;
  :only-child{
    padding: 0;
  }
`;

export const StyledPageHeaders = styled.div`
  min-height: ${Responsive.sidebar};
  background-color: ${({ theme }) => theme.bg};
  padding-top: .4rem;
  display: flex;
  align-items: center;
  > p{
    font-size: 1.7rem;
    text-align: center;
    width: 100%;
  }
  > button{
    position: absolute;
    left: 0;
  }
`;
export const StyledNavItemBage = styled(Badge)`
  
  > :last-child{
    top:0;
    right: 20px;
    background-color: ${({ theme }) => theme.primary};
  }
`;