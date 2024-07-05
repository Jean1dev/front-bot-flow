export const BaseUrlTypebotApi = 'http://161.35.238.7:8080'
export const BaseUrlTypeBotViewer = 'http://161.35.238.7:8081'

export const BaseUrlStorageService = 'https://storage-manager-svc.herokuapp.com'

export const BaseUrlApiEngine = import.meta.env.VITE_BASE_URL_API_ENGINE;

export const BaseUrlApiGerenciamentoDados = import.meta.env.VITE_BASE_URL_API_GERENCIAMENTO_DADOS;

export const isKeycloakActived = import.meta.env.VITE_KEYCLOAK_ACTIVED;

export const KeycloakClientConfig = {
    url: import.meta.env.VITE_KEYCLOAK_CLIENT_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
};