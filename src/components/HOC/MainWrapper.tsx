import React, { ReactNode } from 'react';
import styled, { createGlobalStyle, ThemeProps } from 'styled-components';
import { Theme } from 'assets/theme';

export interface IMainWrapperProps {
  children: ReactNode;
}

export const MainWrapper = ({ children }: IMainWrapperProps) => (
  <StyledContainer>
    <GlobalStyle />
    {children}
  </StyledContainer>
);

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

const GlobalStyle = createGlobalStyle<ThemeProps<Theme>>`
  @font-face {
    font-family: 'Segoe';
    src: url('https://fonts.cdnfonts.com/css/segoe-ui-4');
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Segoe UI, Arial,sans-serif;
  }
  
  body {
    background: ${({ theme }) => theme.colors.PAMPAS}
  }
`;
