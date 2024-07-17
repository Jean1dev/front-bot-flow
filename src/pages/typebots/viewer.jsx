import TypebotComponent from "src/components/typebot-script-component";
import { Seo } from 'src/components/seo';
import {
    Box,
    Card,
    CircularProgress,
    Container,
    Unstable_Grid2 as Grid,
    Stack,
    Typography
} from '@mui/material';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import typebotApi from "src/api/typebot/typebot-api";
import { configuracaoApi } from "src/api/configuracoes";
import { OverviewDoneTasks } from "src/components/overview-done-tasks";
import { OverviewPendingIssues } from "src/components/overview-pending-issues";
import { OverviewOpenTickets } from "src/components/overview-open-tickets";
import { NumerosVinculadosATypeBots } from "src/components/typebots/numeros-vinculados";
import { BaseUrlTypeBotViewer } from "src/constants";

export const TypeBotViewerPage = () => {
    const { state } = useLocation()
    const [typebotId, settypebotId] = useState()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalCompleted: 0,
        totalStarts: 0,
        totalViews: 0
    })
    
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

                    typebotApi.getAnalytics(state.id, token)
                        .then(response => {
                            setStats(response.data.stats)
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
                    <Grid
                        container
                        disableEqualOverflow
                        spacing={{
                            xs: 3,
                            lg: 4,
                        }}
                    >
                        <Grid xs={12}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <div>
                                    <Typography variant="h4">
                                        Overview
                                    </Typography>
                                </div>
                                <div>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid
                            xs={12}
                            md={4}
                        >
                            <OverviewDoneTasks amount={stats.totalCompleted} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={4}
                        >
                            <OverviewPendingIssues amount={stats.totalStarts} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={4}
                        >
                            <OverviewOpenTickets amount={stats.totalViews} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                        >
                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                        >
                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                        >

                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                        >

                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                        >

                            <Card>
                                <TypebotComponent typebotId={typebotId} />
                            </Card>
                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                        >
                            <NumerosVinculadosATypeBots name={state.name} host={BaseUrlTypeBotViewer}/>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default TypeBotViewerPage;