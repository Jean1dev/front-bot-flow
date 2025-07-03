export const BaseUrlTypeBotProxy = 'https://typebot-proxy.azurewebsites.net/api/proxy?'

export const BaseUrlTypebotApi = 'https://typebot.app-services-backend.xyz/'
export const BaseUrlTypeBotViewer = 'https://typebot.app-services-backend.xyz/viewer'

export const BaseUrlStorageService = 'https://storage-manager-svc.herokuapp.com'

export const BaseUrlCommunicationService = 'https://communication-service-4f4f57e0a956.herokuapp.com'

export const BaseUrlApiEngine = import.meta.env.VITE_BASE_URL_API_ENGINE;

export const BaseUrlApiGerenciamentoDados = import.meta.env.VITE_BASE_URL_API_GERENCIAMENTO_DADOS;

export const isKeycloakActived = import.meta.env.VITE_KEYCLOAK_ACTIVED;

export const KeycloakClientConfig = {
    url: import.meta.env.VITE_KEYCLOAK_CLIENT_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
};