import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults"

class ConfiguracaoApiMock {
    getChaves() {
        return retornaComAtraso({
            publicKey: '-----BEGIN PUBLIC KEY-----'
        })
    }
    salvarTypeBotKeys(..._) {
        return retornaComAtraso({})
    }
    getApiKeys() {
        return retornaComAtraso({
            typebot_token: 'q57sYMOq6sDBQ7Cf9h7LgAad',
            typebot_workspaceId: 'clyqfa0nt0001ygen4k7shbj1'
        })
    }
}

class ConfiguracaoApi {
    getChaves() {
        return httpApiGerenciamentoDados.get('configuracoes-usuario/chaves')
    }
    getApiKeys() {
        return httpApiGerenciamentoDados.get('configuracoes-usuario/api-keys')
    }
    salvarTypeBotKeys(token, workspace) {
        return httpApiGerenciamentoDados.post('configuracoes-usuario/api-keys', {
            typebot_token: token,
            typebot_workspaceId: workspace
        })
    }
}

export const configuracaoApi = isDev() ? new ConfiguracaoApiMock() : new ConfiguracaoApi()