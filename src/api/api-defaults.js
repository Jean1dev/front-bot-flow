import axios from "axios"
import { BaseUrlApiEngine, BaseUrlApiGerenciamentoDados } from "../constants"
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