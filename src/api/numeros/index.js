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
    addWhatsappId(..._) {
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
    addWhatsappId(id, whatsId) {
        return httpApiGerenciamentoDados.put(`/numeros/${id}`, { whatsappId: whatsId });
    }
}

export const numerosApi = isDev() ? new NumerosAPiMock() : new NumerosApi();