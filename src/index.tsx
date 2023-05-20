import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { defaultTheme } from 'assets/theme';
import { ThemeProvider } from 'styled-components';
import { App } from './App';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
