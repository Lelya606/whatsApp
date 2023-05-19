import React, { useEffect, useMemo } from 'react';
import { createGlobalStyle, ThemeProps } from 'styled-components';
import { Theme } from 'assets/theme';
import { Messenger } from 'components/Messenger';
import { useStoreContextManager } from 'context/store';
import { Login } from './components/Login';

export const App = () => {
  const { setAuth, auth } = useStoreContextManager();
  const { idInstance, apiTokenInstance } = auth;

  useEffect(() => {
    console.log(setAuth);
    setAuth &&
      setAuth({
        idInstance: '1101821608',
        apiTokenInstance: '33432273d00747c2a6d7e9ddfe8120f318d53946bb7a48e7a6',
      });
  }, []);

  const renderPage = useMemo(() => {
    console.log(idInstance && apiTokenInstance);
    return idInstance && apiTokenInstance ? <Messenger /> : <Login />;
  }, []);

  return (
    <>
      <GlobalStyle />
      {renderPage}
    </>
  );
};

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
