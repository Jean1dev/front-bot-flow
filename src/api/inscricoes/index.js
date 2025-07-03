import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";
import { planosAtivosList } from "./data";

class InscricoesApiMock {
    listInscricoes(_) {
        return retornaComAtraso(planosAtivosList)
    }
    criarInscricao(requestPayload) {
        return retornaComAtraso({}, { id: 'mock' })
    }
}

class InscricoesApi {
    listInscricoes(filters) {
        return httpApiGerenciamentoDados.get('/plano', { params: filters })
    }
    criarInscricao(requestPayload) {
        return httpApiGerenciamentoDados.post('/plano', requestPayload)
    }
}

export const inscricoesApi = isDev() ? new InscricoesApiMock() : new InscricoesApi() 