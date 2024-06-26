import { useMemo, useState } from 'react'
import { createRef, useCallback, useEffect } from "react"
import Terminal from 'react-console-emulator'
import useSocket from "src/hooks/use-socket"

export const RealTimeStreaming = () => {
    const terminalRef = createRef()
    const [history, setHistory] = useState('digite `help` para ver os comandos')

    const pushToStdout = useCallback((message) => {
        if (terminalRef.current) {
            terminalRef.current.pushToStdout(message)
        }

    }, [terminalRef])

    const { connected, socket } = useSocket((data) => {
        if (data.typeMessageSocketOutput === 'TELEMETRIA_MENSAGEM') {
            setHistory(`Envio ${data.remoteJid} :: status -> ${data.status}`)
        }

        if (data.typeMessageSocketOutput === 'SIMPLE_MESSAGE') {
            setHistory(data.message)
        }
    })

    const sendMessageSocket = useCallback(() => {
        if (connected && socket.readyState > 0) {
            console.log('buscando dados')
            socket.send(JSON.stringify({
                type: 'SUBSCRIBE_NUMBERS',
                payload: {}
            }))
        } else {
            console.log('Socket is not connected or not ready.')
            pushToStdout(`Socket is not connected or not ready. connected ${connected} readyState ${socket.readyState}`)
        }

    }, [connected, socket, pushToStdout])

    const commands = useMemo(() => {
        return {
            echo: {
                description: 'Echo a passed string.',
                usage: 'echo <string>',
                fn: (...args) => args.join(' ')
            },
            find: {
                description: 'Busca os registros via socker',
                usage: 'find <string>',
                fn: () => sendMessageSocket()
            }
        }
    }, [sendMessageSocket])

    useEffect(() => {
        pushToStdout(history)
        pushToStdout('*---------------------------------------------------------*')
    }, [history])

    return (
        <Terminal
            commands={commands}
            ref={terminalRef}
            promptLabel={'me@:~$'}
        />
    )
}