import axios from "axios";
import { BaseUrlTypebotApi, BaseUrlTypeBotProxy } from "../../constants";

function proxy(method, url, token) {
    return axios.post(BaseUrlTypeBotProxy, {
        method,
        api: url
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

class TypeBotApi {
    meusTypeBots(workspaceId, token) {
        return proxy('GET', `${BaseUrlTypebotApi}/api/v1/typebots?workspaceId=${workspaceId}`, token)
    }
    getFullTypeBot(id, token) {
        return proxy('GET', `${BaseUrlTypebotApi}/api/v1/typebots/${id}`, token)
    }
    getAnalytics(id, token) {
        return proxy('GET', `${BaseUrlTypebotApi}/api/v1/typebots/${id}/analytics/stats`, token)
    }
}

export default new TypeBotApi();