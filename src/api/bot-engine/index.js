import { httpBotBuilderEngine } from "../api-defaults";

class BotEngine {
    generateNewQrCode(randomKey) {
        return httpBotBuilderEngine.post(`/poc/whats/generate-code`, {
            code: randomKey
        })
    }
}

export const botEngineApi = new BotEngine();