export const BaseUrlApiEngine = import.meta.env.VITE_BASE_URL_API_ENGINE;
export const isKeycloakActived = import.meta.env.VITE_KEYCLOAK_ACTIVED;
export const KeycloakClientConfig = {
    url: import.meta.env.VITE_KEYCLOAK_CLIENT_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
};