import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults"

class ConfiguracaoUsuarioApiMock {
    buscar() {
        return retornaComAtraso({
            id: '507f1f77bcf86cd799439011',
            logoUrl: 'https://example.com/logo.png',
            name: 'Nome da Empresa',
            dataCriacao: '2024-01-15T10:30:00'
        })
    }
    criarOuAtualizar(logoUrl, name) {
        return retornaComAtraso({
            id: '507f1f77bcf86cd799439011',
            logoUrl: logoUrl || 'https://example.com/logo.png',
            name: name || 'Nome da Empresa',
            dataCriacao: '2024-01-15T10:30:00'
        })
    }
    atualizar(logoUrl, name) {
        return retornaComAtraso({}, { status: 204 })
    }
}

class ConfiguracaoUsuarioApi {
    buscar() {
        return httpApiGerenciamentoDados.get('configuracoes-usuario')
    }
    criarOuAtualizar(logoUrl, name) {
        return httpApiGerenciamentoDados.post('configuracoes-usuario', {
            logoUrl,
            name
        })
    }
    atualizar(logoUrl, name) {
        return httpApiGerenciamentoDados.put('configuracoes-usuario', {
            logoUrl,
            name
        })
    }
}

export const configuracaoUsuarioApi = isDev() ? new ConfiguracaoUsuarioApiMock() : new ConfiguracaoUsuarioApi()

