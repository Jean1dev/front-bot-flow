import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";
import numerosData, { fullNumber } from "./data";

class NumerosAPiMock {
    getNumeros(_) {
        return retornaComAtraso(numerosData)
    }
    getById(_) {
        return retornaComAtraso(fullNumber)
    }
    addNovoNumero(_) {
        return retornaComAtraso({})
    }
}

class NumerosApi {
    getNumeros(filters) {
        return httpApiGerenciamentoDados.get('/numeros', { params: filters });
    }
    getById(id) {
        return httpApiGerenciamentoDados.get(`/numeros/${id}`);
    }
    addNovoNumero(data) {
        return httpApiGerenciamentoDados.post('/numeros', data);
    }
}

export const numerosApi = isDev() ? new NumerosAPiMock() : new NumerosApi();