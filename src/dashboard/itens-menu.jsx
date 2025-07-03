import { useMemo } from "react"
import { paths } from "../paths"
import { SvgIcon } from "@mui/material"
import { 
    HomeSmile,
    Phone,
    MarkerPin01,
    Telescope,
    FaceIdSquare,
    Users01
} from "@untitled-ui/icons-react"
import { AdminPanelSettings } from "@mui/icons-material"

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
                        title: 'Campanhas',
                        path: paths.campanhas.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <MarkerPin01 />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Criar nova campanha',
                                path: paths.campanhas.criar
                            },
                            {
                                title: 'Listar campanhas',
                                path: paths.campanhas.list
                            },
                        ]
                    },
                    {
                        title: 'Numeros',
                        path: paths.numeros.list,
                        icon: (
                            <SvgIcon fontSize="small">
                                <Phone />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Consultar Numeros',
                                path: paths.numeros.list
                            },
                        ]
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
                        ]
                    },
                    {
                        title: 'Telemetria',
                        path: paths.telemetria.index,
                        icon: (
                            <SvgIcon fontSize="small">
                                <Telescope />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Logs',
                                path: paths.telemetria.index
                            },
                        ]
                    },
                    {
                        title: 'Meus TypeBots',
                        path: paths.typebot.index,
                        icon: (
                            <SvgIcon fontSize="small">
                                <FaceIdSquare />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Listagem',
                                path: paths.typebot.list
                            },
                            
                        ]
                    },
                    {
                        title: 'Menu Admin',
                        path: '/a',
                        icon: (
                            <SvgIcon fontSize="small">
                                <AdminPanelSettings />
                            </SvgIcon>
                        ),
                        items: [
                            {
                                title: 'Flow',
                                path: paths.botFlow.index
                            },
                            {
                                title: 'PlayGround',
                                path: paths.playground.index
                            },
                            
                        ]
                    },
                ]
            }
        ]
    }, [])
}