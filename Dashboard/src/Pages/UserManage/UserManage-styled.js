import styled from "styled-components";
import Box from '@mui/material/Box';
import { btnReset } from "../../styles/variables";

export const StyledModalBox = styled(Box)`
  position: absolute;
  width: 90%;
  height: 95%;
  max-height: 80%;
  max-width: 90%;
  top: 50%;
  left: 50%;
  background-color: #e2e8f0;
  border: 2px ${({ theme }) => theme.bg2};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
  padding: 4px;
  transform: translate(-50%, -50%);
`;

export const StyledBTN = styled.button`
    ${btnReset};
    min-width: 8rem;
    max-width: 8rem;
    padding: 1.5rem 2.5rem;
    outline: .1px solid rgb(0,0,0,.3);
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;

    border-radius: 8px;
    cursor: pointer;
`;
export const StyledAddEditFieldBTN = styled.button`
    ${btnReset};
    width: 100%;
    padding: .65rem;
    font-size: 1.5rem;
    font-weight: 500;
    margin: .6rem 0;
    text-align: center;
    outline: 1px solid rgb(0,0,0,1);
`;
