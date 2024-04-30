import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";
import numerosData, { fullNumber } from "./data";

class NumerosAPiMock {
    getNumeros(_) {
        return retornaComAtraso(numerosData)
    }

    getById(_) {
        return retornaComAtraso(fullNumber)
    }
}

class NumerosApi {
    getNumeros(filters) {
        return httpApiGerenciamentoDados.get('/numeros', { params: filters });
    }

    getById(id) {
        return httpApiGerenciamentoDados.get(`/numeros/${id}`);
    }
}

export const numerosApi = isDev() ? new NumerosAPiMock() : new NumerosApi();