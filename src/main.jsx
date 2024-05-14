import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { isKeycloakActived } from './constants'
import { AppWithKeycloak } from './protected-app.jsx';

export const renderApp = () => (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  isKeycloakActived === "true" ? <AppWithKeycloak/> : renderApp()
);