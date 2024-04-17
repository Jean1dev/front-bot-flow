import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

import { ReactKeycloakProvider } from "@react-keycloak/web"
import Keycloak from 'keycloak-js'
import {KeycloakClientConfig, isKeycloakActived} from './constants'

const keycloakClient = new Keycloak(KeycloakClientConfig)

const initOptions = { pkceMethod: 'S256' , onLoad: 'login-required'}

const renderApp = () => (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

const appWithKeycloak = () => (
  <ReactKeycloakProvider authClient={keycloakClient} initOptions={initOptions}>
    {renderApp()}
  </ReactKeycloakProvider>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  isKeycloakActived === "true" ? appWithKeycloak() : renderApp()
);