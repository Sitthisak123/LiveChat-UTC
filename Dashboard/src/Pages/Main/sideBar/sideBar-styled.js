import styled from "styled-components";
import { Link } from "react-router-dom";
import {v} from '../../../styles/variables.js';
export const SideBarHeadersStyled = styled.div`
    width: 100%;
`;
export const SideBarOptoinStyled = styled.div`
    width: 100%;
`;
export const LinkStyled = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    padding: calc(${v.mnSpacing} - 2px) 0px;
`;