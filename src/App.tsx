import React from 'react';
import { createGlobalStyle, ThemeProps } from 'styled-components';
import { Theme } from 'assets/theme';
import { Messenger } from 'components/Messenger';

export const App = () => (
  <>
    <GlobalStyle />
    <Messenger />
  </>
);

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
