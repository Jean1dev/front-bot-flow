import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";
import { campanhaList } from "./data";

class CampanhaApiMock {
    criarNovaCampanha(_) {
        return retornaComAtraso({}, { id: 'mock' })
    }
    iniciarDisparos(_) {
        return retornaComAtraso({
            executionID: 'execIdMock'
        })
    }
    list(_) {
        return retornaComAtraso(campanhaList)
    }
}

class CampanhaApi {
    criarNovaCampanha(requestPayload) {
        return httpApiGerenciamentoDados.post('/campanhas', requestPayload)
    }
    iniciarDisparos(idCampanha) {
        return httpApiGerenciamentoDados.post(`/campanhas/disparar/${idCampanha}`)
    }
    list(filters) {
        return httpApiGerenciamentoDados.get('/campanhas', { params: filters })
    }
}

export const campanhaApi = isDev() ? new CampanhaApiMock() : new CampanhaApi()