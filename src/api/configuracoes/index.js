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
            typebot_token: 'JeugZQgfKYHxBIPvc70AFLPx',
            typebot_workspaceId: 'cly7ikdxa0001y2nsmp4aj5ii'
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