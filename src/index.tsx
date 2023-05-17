import React from 'react';
import ReactDOM from 'react-dom/client';
import { defaultTheme } from 'assets/theme';
import { ThemeProvider } from 'styled-components';
import { StoreManager } from 'context/store';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <StoreManager>
        <App />
      </StoreManager>
    </ThemeProvider>
  </React.StrictMode>,
);
