import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";

class CampanhaApiMock {
    criarNovaCampanha(_) {
        return retornaComAtraso({}, { id: 'mock' })
    }
    iniciarDisparos(_) {
        return retornaComAtraso({
            executionID: 'execIdMock'
        })
    }
}

class CampanhaApi {
    criarNovaCampanha(requestPayload) {
        return httpApiGerenciamentoDados.post('/campanhas', requestPayload)
    }
    iniciarDisparos(idCampanha) {
        return httpApiGerenciamentoDados.post(`/campanhas/disparar/${idCampanha}`)
    }
}

export const campanhaApi = isDev() ? new CampanhaApiMock() : new CampanhaApi()