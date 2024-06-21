import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";
import { collection } from "./data";

class TelemetriaApiMock {
    get() {
        return retornaComAtraso(collection)
    }
    deleteById(_) {
        return retornaComAtraso({})
    }
    deleteAllByNumber(_) {
        return retornaComAtraso({})
    }
}

class TelemetriaApi {
    get() {
        return httpApiGerenciamentoDados.get('/v1/telemetria')
    }
    deleteById(id) {
        return httpApiGerenciamentoDados.delete(`/v1/telemetria/${id}`)
    }
    deleteAllByNumber(number) {
        return httpApiGerenciamentoDados.delete(`/v1/telemetria/numero/${number}`)
    }
}

export const telemetriaApi = isDev() ? new TelemetriaApiMock() : new TelemetriaApi();