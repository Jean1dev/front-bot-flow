import axios from "axios"
import { 
    BaseUrlApiEngine, 
    BaseUrlApiGerenciamentoDados, 
    BaseUrlCommunicationService, 
    BaseUrlStorageService 
} from "../constants"
import { toastError } from "../utils/toasts-utils"

const defaultSuccess = (response) => {
    return response;
}

const defaultError = (error) => {
    console.log(error.code);

    if (error.code === 'ECONNABORTED') {
        toastError('Tempo de conexão excedido');
    }

    if (error?.response?.status === 403) {
        toastError('Sessão expirada, necessario novo login');
    }

    if (error?.response?.status === 400) {
        toastError(error.response?.data?.message);
    }

    if (error?.response?.status >= 500) {
        toastError('Erro interno do servidor');
    }

    const messages = error.response?.data?.details || null;
    if (messages) {
        messages.forEach((element) => {
            toastError(element);
        });
    }

    throw error;
}

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export function retornaComAtraso(body, headers = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                data: body,
                status: 200,
                statusText: 'OK',
                headers, 
            })
        }, 1000)
    })
}

export async function sendSMS(phone, message) {
    const URL_COMMUNICATION_SERVICE = BaseUrlCommunicationService
    const body = {
        desc: message,
        recipients: [phone],
    }
    const response = await axios.post(`${URL_COMMUNICATION_SERVICE}/notificacao/sms`, body)
    return response.data
}

export async function uploadResource(resourceFile) {
    const URL_STORAGE_SERVER = BaseUrlStorageService
    const devMode = isDev()
    const url = devMode
        ? `${URL_STORAGE_SERVER}/v1/local`
        : `${URL_STORAGE_SERVER}/v1/s3`

    const form = new FormData();
    form.append("file", resourceFile);
    const BUCKET_STORAGE = 'binnoroteirizacao'

    const options = {
        method: 'POST',
        url,
        params: { bucket: BUCKET_STORAGE },
        headers: {
            'Content-Type': 'multipart/form-data',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: form
    };

    if (devMode) {
        return 'https://teletime.com.br/wp-content/uploads/2021/06/Itau_berrini_6-scaled.jpeg'
    }

    const response = await axios.request(options)
    return response.data
}

export const httpApiGerenciamentoDados = axios.create({
    baseURL: BaseUrlApiGerenciamentoDados,
    timeout: 20000
})

export const httpBotBuilderEngine = axios.create({
    baseURL: BaseUrlApiEngine,
    timeout: 20000
})

export function addAuthorizationHeader(token) {
    httpApiGerenciamentoDados.defaults.headers.common['Authorization'] = token
}

httpApiGerenciamentoDados.interceptors.response.use(defaultSuccess, defaultError);
httpBotBuilderEngine.interceptors.response.use(defaultSuccess, defaultError);