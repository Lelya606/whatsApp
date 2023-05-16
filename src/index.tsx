import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { defaultTheme } from 'assets/theme';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
