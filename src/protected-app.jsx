import { ReactKeycloakProvider } from "@react-keycloak/web"
import Keycloak from 'keycloak-js'
import { KeycloakClientConfig } from './constants'
import { renderApp } from "./main"
import { useCallback, useMemo, useState } from "react"
import { addAuthorizationHeader } from "./api/api-defaults"
import AguardandoAuth from "./components/await-auth"
import ServerError from "./components/server-error"

const initOptions = { pkceMethod: 'S256', onLoad: 'login-required' }
const keycloakClient = new Keycloak(KeycloakClientConfig)

export const AppWithKeycloak = () => {
    const [authState, setAuthState] = useState('await')

    const app = useMemo(() => {
        if (authState === 'await') {
            return <AguardandoAuth/>
        }

        if (authState === 'success') {
            return renderApp()
        }

        return <ServerError />

    }, [authState])

    const onTokensReceived = useCallback((tokens) => {
        addAuthorizationHeader(`Bearer ${tokens.token}`)
        console.log('app authorized')
    }, [])

    const updateAuthState = useCallback((event, error) => {
        if (error) {
            console.log(error)
            setAuthState('error')
            return
        }

        switch (event) {
            case 'onReady':
                // Código para lidar com o evento onReady
                break;
            case 'onInitError':
                setAuthState('error')
                break;
            case 'onAuthSuccess':
                setAuthState('success')
                break;
            case 'onAuthError':
                setAuthState('error')
                break;
            case 'onAuthRefreshSuccess':
                // Código para lidar com o evento onAuthRefreshSuccess
                break;
            case 'onAuthRefreshError':
                setAuthState('error')
                break;
            case 'onTokenExpired':
                // Código para lidar com o evento onTokenExpired
                break;
            case 'onAuthLogout':
                setAuthState('error')
                break;
            default:
                console.log('Evento não reconhecido');
        }
    }, [])

    return (
        <ReactKeycloakProvider
            authClient={keycloakClient}
            initOptions={initOptions}
            onEvent={updateAuthState}
            onTokens={onTokensReceived}
        >
            {app}
        </ReactKeycloakProvider>
    )
}