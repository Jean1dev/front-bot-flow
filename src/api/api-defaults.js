import axios from "axios"
import { BaseUrlApiGerenciamentoDados } from "../constants"
import { toastError } from "../utils/toasts-utils"

export function isDev() {
    return process.env.NODE_ENV === 'development'
}

export function retornaComAtraso(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: value })
        }, 1000)
    })
}

export const httpApiGerenciamentoDados = axios.create({
    baseURL: BaseUrlApiGerenciamentoDados,
    timeout: 20000
})

export function addAuthorizationHeader(token) {
    httpApiGerenciamentoDados.defaults.headers.common['Authorization'] = token
}

httpApiGerenciamentoDados.interceptors.response.use((response) => {
    return response;
}, (error) => {
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
});