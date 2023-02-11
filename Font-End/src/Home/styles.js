import styled from "styled-components";

export const SLayout = styled.div`
    display: flex;
    max-height: 100%;
`;

export const SMain = styled.main`
    border-left: .1rem solid ${({theme}) =>  theme.border};
    background-color: ${({theme}) =>  theme.bg3};
    width: 100%;
    max-height: 100vh;
    h1 {
        font-size: 14px;
    }
`;
