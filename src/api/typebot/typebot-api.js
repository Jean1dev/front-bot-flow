import axios from "axios";
import { BaseUrlTypebotApi, BaseUrlTypeBotProxy } from "../../constants";

class TypeBotApi {
    meusTypeBots(workspaceId, token) {
        return axios.post(BaseUrlTypeBotProxy, {
            api: `${BaseUrlTypebotApi}/api/v1/typebots?workspaceId=${workspaceId}`,
            method: 'GET'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    getFullTypeBot(id, token) {
        return axios.post(BaseUrlTypeBotProxy, {
            method: 'GET',
            api: `${BaseUrlTypebotApi}/api/v1/typebots/${id}`
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}

export default new TypeBotApi();