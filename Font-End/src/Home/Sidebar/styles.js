import { Link } from "react-router-dom";
import styled from "styled-components";

import { btnReset, v, Responsive } from "../../styles/variables";

export const SSidebar = styled.div.attrs(props => ({
    className: props.className || 'sidebar'
}))`

   /* min-width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)}; */
  background: transparent;
  /* background: ${({ theme }) => theme.bg}; */
  /* height: 100vh;
  padding: ${v.mnSpacing};
  max-width: 15vw;
  position: relative;  */

  background: ${({ theme }) => theme.bg2};

  @media (max-width: 780px) {
    height: ${Responsive.sidebar};
    display: flex;
    position: fixed;
    bottom: 0;
    flex-direction: row;
    max-width: 100vw;
    width: 100vw;
    z-index: 10;

    align-items: center;
    justify-content: center;
  }

`;


export const SSidebarButton = styled.button`
    ${btnReset};
    right: ${({ isOpen }) => (isOpen ? `-16px` : `-25px`)};
    width: 32px;
    height: 32px;
    border-radius: 25%;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;

    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
    margin: ${({ isOpen }) => (isOpen ? `1rem 0 1rem calc(100% - 2rem)` : `1rem auto`)};

    //Responsive Sidebar open-close btn
    @media (max-width: 780px) {
        display: none;
    }


`;

export const SLogo = styled.div`
    width: 52px;

    img {
        max-width: 100%;
        height: auto;
    }
    cursor: pointer;

    margin-bottom: ${v.lgSpacing};
`;

export const SSearch = styled.div`
    background: ${({ theme }) => theme.bgAlpha};
    border: 1px solid ${({ theme }) => theme.bg3};
    border-radius: ${v.borderRadius};
    input {
        padding: 0 ${v.smSpacing};
        font-family: inherit;
        letter-spacing: inherit;
        font-size: 16px;
        width: 100%;
        outline: none;
        border: none;
        color: inherit;
        background: transparent;
    }
    display: flex;
`;

export const SSearchIcon = styled.button`
    ${btnReset};
    padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
    display: flex;
    cursor: pointer;

    svg {
        font-size: 20px;
    }
`;

export const SDivider = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.bg3};
    margin: ${v.lgSpacing} 0;
    
    //Responsive Sidebar Divider
    @media (max-width: 780px) {
        display: none;
    }

`;

export const SLinkContainer = styled.div`
    background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme.sidebarActive)};
    /* border-radius: ${v.borderRadius}; */
    border-top-left-radius: ${v.borderRadius};
    border-bottom-left-radius: ${v.borderRadius};


    margin: 4pX 0;
    
    :hover {
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
    }


`;

export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    padding: calc(${v.mnSpacing} - 2px) 0px;
    
`;

export const SLinkIcon = styled.div`
    padding: ${v.mnSpacing} ${v.mdSpacing};
    display: flex;
    
    svg {
        font-size: 20px;
    }
`;

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    margin-left: ${v.smSpacing};
`;

export const SLinkNotification = styled.div`
    font-size: 14px;
    padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
    border-radius: calc(${v.borderRadius} / 2);
    background: ${({ theme }) => theme.primary};
    color: white;

    margin-right: ${v.mnSpacing};
    margin-left: ${v.smSpacing};
`;

export const STheme = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
`;
export const SThemeLabel = styled.span`
    display: block;
    flex: 1;
`;
export const SThemeToggler = styled.button`
    ${btnReset};
    margin: 0 auto;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background: ${({ theme, isActive }) => (!isActive ? theme.bg3 : theme.primary)};

    position: relative;
     //Responsive Sidebar theme toggle
     @media (max-width: 780px) {
        display: none;
    }
`;

export const SToggleThumb = styled.div`
    height: 18px;
    width: 18px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    transition: 0.2s ease right;
    right: calc(100% - 18px - 1px);
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
`;
