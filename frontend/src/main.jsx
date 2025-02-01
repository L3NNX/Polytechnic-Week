import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';  // Make sure to import App
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin + "/admin"}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
