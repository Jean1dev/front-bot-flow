import axios from "axios"
import { BaseUrlApiGerenciamentoDados } from "../constants"

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