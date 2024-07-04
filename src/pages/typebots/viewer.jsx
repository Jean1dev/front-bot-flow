import TypebotComponent from "src/components/typebot-script-component";
import { Seo } from 'src/components/seo';
import {
    Box,
    CircularProgress,
    Container
} from '@mui/material';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import typebotApi from "src/api/typebot/typebot-api";
import { configuracaoApi } from "src/api/configuracoes";

export const TypeBotViewerPage = () => {
    const { state } = useLocation()
    const [typebotId, settypebotId] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (state) {
            configuracaoApi.getApiKeys()
                .then(response => {
                    const token = response.data.typebot_token
                    typebotApi.getFullTypeBot(state.id, token)
                        .then(response => {
                            settypebotId(response.data.typebot.publicId)
                            setLoading(false)
                        })
                })
        }
    }, [state])

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 6,
                }}
            >
                <CircularProgress />

            </Box>
        )
    }

    return (
        <>
            <Seo title="Meus TypeBots" />
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <TypebotComponent typebotId={typebotId} />
                </Container>
            </Box>
        </>
    )
}

export default TypeBotViewerPage;