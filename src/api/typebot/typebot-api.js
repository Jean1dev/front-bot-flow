import axios from "axios";
import { BaseUrlTypebotApi } from "../../constants";

class TypeBotApi {
    meusTypeBots(workspaceId, token) {
        return axios.get(`${BaseUrlTypebotApi}/api/v1/typebots?workspaceId=${workspaceId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    getFullTypeBot(id, token) {
        return axios.get(`${BaseUrlTypebotApi}/api/v1/typebots/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new TypeBotApi();