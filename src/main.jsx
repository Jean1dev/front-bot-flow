import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

import { ReactKeycloakProvider } from "@react-keycloak/web"
import Keycloak from 'keycloak-js'
import {KeycloakClientConfig} from './constants'

const keycloakClient = new Keycloak(KeycloakClientConfig)

const initOptions = { pkceMethod: 'S256' , onLoad: 'login-required'}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReactKeycloakProvider authClient={keycloakClient} initOptions={initOptions}>
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </ReactKeycloakProvider>
)
