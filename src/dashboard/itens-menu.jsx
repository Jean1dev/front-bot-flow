import { useMemo } from "react"
import { paths } from "../paths"
import { SvgIcon } from "@mui/material"
import { 
    HomeSmile,
    Users01,
    Settings04
} from "@untitled-ui/icons-react"

export const useSections = () => {
    return useMemo(() => {
        return [
            {
                items: [
                    {
                        title: 'Home',
                        path: paths.index,
                        icon: (
                            <SvgIcon fontSize="small">
                                <HomeSmile/>
                            </SvgIcon>
                        )
                    },
                    {
                        title: 'Inscrições',
                        path: paths.inscricoes.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <Users01 />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Gerenciar Inscrições',
                                path: paths.inscricoes.list
                            },
                            {
                                title: 'Assinaturas Ativas',
                                path: paths.assinaturasAtivas.list
                            },
                        ]
                    },
                    {
                        title: 'Configurações',
                        icon: (
                            <SvgIcon fontSize="small">
                                <Settings04 />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Configurações de Plano',
                                path: paths.configuracoesPlano.list
                            },
                            {
                                title: 'Configurações do Usuário',
                                path: paths.configuracoesUsuario.list
                            },
                        ]
                    },
                ]
            }
        ]
    }, [])
}