import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";

class PlayGroundApiMock {
    send(_) {
        return retornaComAtraso({
            "success": true,
            "needValidadeNumber": false,
            "message": "Playground enviado com sucesso",
            "senderId": "6669869439c5ea3265b4700b"
        })
    }
}

class PlayGroundApi {
    send(payload) {
        return httpApiGerenciamentoDados.post('/playground', payload)
    }
}

export const playGroundApi = isDev() ? new PlayGroundApiMock() : new PlayGroundApi();