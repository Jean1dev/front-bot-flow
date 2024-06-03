import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";
import numerosData, { fullNumber, numerosSimplificados } from "./data";

class NumerosAPiMock {
    getNumeros(_) {
        return retornaComAtraso(numerosData)
    }
    getNumerosSimplificado() {
        return retornaComAtraso(numerosSimplificados)
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
    atualizarNumero(_) {
        return retornaComAtraso({})
    }
}

class NumerosApi {
    getNumeros(filters) {
        return httpApiGerenciamentoDados.get('/numeros', { params: filters });
    }
    getNumerosSimplificado() {
        return httpApiGerenciamentoDados.get('/numeros/simplificado');
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
    atualizarNumero(data) {
        return httpApiGerenciamentoDados.put(`/numeros/atualizar/${data.id}`, data);
    }
}

export const numerosApi = isDev() ? new NumerosAPiMock() : new NumerosApi();