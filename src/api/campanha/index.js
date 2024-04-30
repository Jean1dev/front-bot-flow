import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";

class CampanhaApiMock {
    criarNovaCampanha(_) {
        return retornaComAtraso({})
    }
}

class CampanhaApi {
    criarNovaCampanha(requestPayload) {
        return httpApiGerenciamentoDados.post('/campanhas', requestPayload)
    }
}

export const campanhaApi = isDev() ? new CampanhaApiMock() : new CampanhaApi()