import { useMemo } from "react"
import { paths } from "../paths"
import { SvgIcon } from "@mui/material"
import { 
    HomeSmile,
    Phone,
    MarkerPin01
} from "@untitled-ui/icons-react"

export const useSections = () => {
    return useMemo(() => {
        return [
            {
                items: [
                    {
                        title: 'Dashboard',
                        path: paths.index,
                        icon: (
                            <SvgIcon fontSize="small">
                                <HomeSmile/>
                            </SvgIcon>
                        )
                    },
                    {
                        title: 'Campanhas',
                        path: paths.campanhas.criar,
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
                ]
            }
        ]
    }, [])
}