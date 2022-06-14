// Node Modules
// Css
import './index.css';

// Components
import App from 'App';
// Providers
import AuthMediatorProvider from 'providers/authMediatorProvider';
import SessionProvider from 'providers/sessionProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <AuthMediatorProvider>
          <App />
        </AuthMediatorProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
