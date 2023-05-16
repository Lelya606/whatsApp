import React from 'react';
import { createGlobalStyle, ThemeProps } from 'styled-components';
import { Theme } from 'assets/theme';
import { Messenger } from 'components/Messenger';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Messenger />
    </>
  );
};

const GlobalStyle = createGlobalStyle<ThemeProps<Theme>>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    background: ${({ theme }) => theme.colors.PAMPAS}
  }
`;
