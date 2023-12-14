import { useMemo } from "react"
import { paths } from "../paths"
import { SvgIcon } from "@mui/material"
import { HomeSmile } from "@untitled-ui/icons-react"

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
                    }
                ]
            }
        ]
    }, [])
}