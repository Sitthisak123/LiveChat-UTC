import React, { useContext, useEffect, useRef, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSearch,
    SSearchIcon,
    SSidebar,
    SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import { logoSVG } from "../../_assets";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add'; //Test //

import { ThemeContext } from "../../App.js";

import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

const Sidebar = () => {
    const searchRef = useRef(null);
    const { theme, setTheme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const isSmallScreen = useMediaQuery('(max-width: 780px)');

    const searchClickHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // search functionality
        }
    };
    useEffect(() => {
        console.log(sidebarOpen);
        if (isSmallScreen) {
            setSidebarOpen(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallScreen])
    return (
        <>
            <SSidebar>
                <>
                    <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                        <ArrowBackIosNewOutlinedIcon />
                    </SSidebarButton>
                </>

                {/* <SLogo>
                    <img src={logoSVG} alt="logo" />
                </SLogo>
                <SSearch
                    onClick={searchClickHandler}
                    style={!sidebarOpen ? { width: `fit-content` } : {}}
                >
                    <SSearchIcon>
                        <SearchOutlinedIcon />
                    </SSearchIcon>
                    <input
                        ref={searchRef}
                        placeholder="Search"
                        style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
                    />
                </SSearch>
                <SDivider /> */}

                {linksArray.map(({ icon, label, notification, to }) => (
                    <SLinkContainer key={label} isActive={pathname === to}>
                        <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon isOpen={sidebarOpen} >{icon}</SLinkIcon>
                            {sidebarOpen && (
                                <>
                                    <SLinkLabel>{label}</SLinkLabel>
                                    {/* if notifications are at 0 or null, do not display */}
                                    {!!notification && (
                                        <SLinkNotification>{notification}</SLinkNotification>
                                    )}
                                </>
                            )}
                        </SLink>
                    </SLinkContainer>
                ))}

                <SDivider />

                {secondaryLinksArray.map(({ icon, label }) => (
                    <SLinkContainer key={label}>
                        <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon isOpen={sidebarOpen}>{icon}</SLinkIcon>
                            {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                        </SLink>
                    </SLinkContainer>
                ))}

                <SDivider />

                <STheme>
                    {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
                    <SThemeToggler
                        isActive={theme === "dark"}
                        onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                    >
                        <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                    </SThemeToggler>
                </STheme>
            </SSidebar>
        </>
    );
};

const linksArray = [
    {
        label: "Profile",
        icon: <AccountCircleIcon />,
        to: "/Home/Profile",
        notification: 0,
    },
    {
        label: "Chats",
        icon: <ModeCommentIcon />,
        to: "/Home/Chat",
        notification: 3,
    },
    {
        label: "Friends",
        icon: <PeopleAltIcon />,
        to: "/Home/Friend",
        notification: 5,
    }
];

const secondaryLinksArray = [
    {
        label: "Settings",
        icon: <SettingsIcon />,
    }
];

export default Sidebar;
