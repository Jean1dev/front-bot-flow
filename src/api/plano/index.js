import { httpApiGerenciamentoDados, isDev, retornaComAtraso } from "../api-defaults";

const assinaturasAtivasMock = [
    { usuario: "joao", ativoHa: "2 meses e 3 dias" },
    { usuario: "maria", ativoHa: "1 mês e 15 dias" }
];

class PlanoApiMock {
    getAssinaturasAtivas() {
        return retornaComAtraso(assinaturasAtivasMock);
    }
}

class PlanoApi {
    getAssinaturasAtivas() {
        return httpApiGerenciamentoDados.get("/plano/assinaturas-ativas");
    }
}

export const planoApi = isDev() ? new PlanoApiMock() : new PlanoApi();
