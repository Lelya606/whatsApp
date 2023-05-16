import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface IMainWrapperProps {
  children: ReactNode;
}

export const MainWrapper = ({ children }: IMainWrapperProps) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  :after {
    position: fixed;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 7.94rem;
    content: '';
    background: ${({ theme }) => theme.colors.PERSIAN_GREEN};
  }
`;
