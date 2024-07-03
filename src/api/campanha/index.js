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
    removerCampanha(_) {
        return retornaComAtraso({})
    }
    buscarArquivos(_) {
        return retornaComAtraso(['https://teletime.com.br/wp-content/uploads/2021/06/Itau_berrini_6-scaled.jpeg'])
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
    removerCampanha(idCampanha) {
        return httpApiGerenciamentoDados.delete(`/campanhas/${idCampanha}`)
    }
    buscarArquivos(id) {
        return httpApiGerenciamentoDados.get(`/campanhas/${id}/arquivos`)
    }
}

export const campanhaApi = isDev() ? new CampanhaApiMock() : new CampanhaApi()