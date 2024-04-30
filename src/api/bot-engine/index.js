import axios from "axios";
import { BaseUrlApiEngine } from "../../constants";
import { generateRandomString } from "../../utils";

class BotEngine {
    generateNewQrCode() {
        const randomKey = generateRandomString(10);
        return axios.post(`${BaseUrlApiEngine}/poc/whats/generate-code`, {
            code: randomKey
        })
    }
}

export const botEngineApi = new BotEngine();