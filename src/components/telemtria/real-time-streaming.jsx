import { useState } from 'react'
import { createRef, useCallback, useEffect } from "react"
import Terminal from 'react-console-emulator'
import useSocket from "../../hooks/use-socket"

const commands = {
    echo: {
        description: 'Echo a passed string.',
        usage: 'echo <string>',
        fn: (...args) => args.join(' ')
    }
}

export const RealTimeStreaming = () => {
    const terminalRef = createRef()
    const [history, setHistory] = useState('Buscando dados')

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

    useEffect(() => {
        if (connected && socket.readyState > 0) {
            socket.send(JSON.stringify({
                type: 'SUBSCRIBE_NUMBERS',
                payload: {}
            }))
        }
    }, [connected, socket])

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