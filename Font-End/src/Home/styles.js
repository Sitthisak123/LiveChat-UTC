import styled from "styled-components";
import { Responsive } from "../styles/variables";
export const SLayout = styled.div`
    display: flex;
    max-height: 100%;

  //Responsive Home Layout
  @media (max-width: 780px) {
    flex-direction: column-reverse;
}
`;

export const SMain = styled.main`
    border-left: .1rem solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.bg3};
    width: 100%;
    max-height: 100%;
    h1 {
        font-size: 14px;
    }

    @media (max-width: 780px) {
       min-height: calc(100vh - ${Responsive.sidebar});
       position: relative;
    }
`;