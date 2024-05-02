import axios from "axios";
import { BaseUrlApiEngine } from "../../constants";

class BotEngine {
    generateNewQrCode(randomKey) {
        return axios.post(`${BaseUrlApiEngine}/poc/whats/generate-code`, {
            code: randomKey
        })
    }
}

export const botEngineApi = new BotEngine();