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

export default function useSocket(callback = (...args) => { }) {
    const { user } = useUserAuth()
    const dev = isDev()
    const [connected, setConnected] = useState(false)

    const socket = useMemo(() => {
        if (dev) {
            return mockSocket()
        }

        return new WebSocket(`wss://${BaseUrlApiGerenciamentoDados}/ws?auth=${user.sub}`)
    }, [user, dev])

    useEffect(() => {
        socket.onopen = () => {
            console.log('WebSocket connected')
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