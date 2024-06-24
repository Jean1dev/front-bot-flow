import { useEffect, useMemo, useState } from "react"
import { isDev } from "../api/api-defaults"
import { useUserAuth } from "./use-user-auth"
import { BaseUrlApiGerenciamentoDados } from "../constants"

function mockSocket() {
    return {
        onopen: () => { },
        onmessage: () => { },
        onclose: () => { },
        send: () => { },
        readyState: 0
    }
}

function sanitizeUrl() {
    const parsedUrl = new URL(BaseUrlApiGerenciamentoDados)
    parsedUrl.protocol = parsedUrl.protocol.replace('https', 'wss')
    return parsedUrl.toString()
}

export default function useSocket(callback = (...args) => { }) {
    const { user } = useUserAuth()
    const dev = isDev()
    const [connected, setConnected] = useState(false)

    const socket = useMemo(() => {
        if (dev) {
            return mockSocket()
        }

        const url = sanitizeUrl()
        return new WebSocket(`${url}/ws?auth=${user.sub}`)
    }, [user, dev])

    useEffect(() => {
        socket.onopen = () => {
            setConnected(true)
        }

        socket.onmessage = (event) => {
            callback(JSON.parse(event.data))
        }

        socket.onclose = () => {
            setConnected(false)
        }
    }, [socket])

    return {
        socket,
        connected
    }
}