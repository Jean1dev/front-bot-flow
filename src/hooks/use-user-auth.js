import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { isKeycloakActived } from '../constants'

const defaulUser = {
    email: 'XXXXXXXXXXXXX',
    name: 'test',
    sub: 'test',
    preferred_username: 'XXXX',
    token: 'XXXX'
}

function mockUser() {
    const user = defaulUser
    return { user }
}

function kcServer() {
    const [user, setUser] = useState(defaulUser)
    const { initialized, keycloak } = useKeycloak()
    
    async function loadUserInfo() {
        const result = await keycloak.loadUserInfo()
        setUser({
            email: result.email,
            name: result.name,
            sub: result.sub,
            preferred_username: result.preferred_username,
            token: keycloak.token
        })
    }

    useEffect(() => {
        if (initialized) {
            loadUserInfo()
        }

    }, [initialized])

    return { user }
}

export const useUserAuth = () => {
    if (isKeycloakActived === "true") {
        return kcServer()
    }

    return mockUser()
}