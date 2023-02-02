import styled from "styled-components";

import { v } from "../styles/variables";

export const SLayout = styled.div`
    display: flex;
`;

export const SMain = styled.main`
    border-left: .1rem solid ${({theme}) =>  theme.border};
    background-color: ${({theme}) =>  theme.bg3};
    h1 {
        font-size: 14px;
    }
`;
