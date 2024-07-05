import { useCallback, useEffect, useState } from "react"
import { paths } from 'src/paths'
import { Seo } from 'src/components/seo';
import {
    Box,
    Container,
    Stack,
    Unstable_Grid2 as Grid,
    Typography,
    Button,
    Card,
    TextField,
    Divider,
    CardHeader
} from '@mui/material';
import { SimpleListTable } from 'src/components/list-tables';
import toast from "react-hot-toast";
import typebotApi from "src/api/typebot/typebot-api";
import { useLocalStorage } from "src/hooks/use-local-storage";
import { configuracaoApi } from "src/api/configuracoes";
import { CONFIGURACOES_LOCAL_STORAGE } from "src/constants/localStorageKeys";
import { useNavigate } from "react-router-dom";

function mapReduce(typeBots) {
    return typeBots.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
        published: item.publishedTypebotId ? 'PUBLICADO' : 'NAO PUBLICADO'
    }))
}

const MeusTypeBotsPage = () => {
    const [token, setToken] = useState('')
    const [workspaceId, setWorkspaceId] = useState('')
    const [items, setItems] = useState([])
    const [configuracoes, setConfig] = useLocalStorage(CONFIGURACOES_LOCAL_STORAGE, null)
    const navigate = useNavigate()

    const buscarTypeBots = useCallback((var_token, var_workspace) => {
        toast.loading('Carregando os typebots', { duration: 1000 })
        const tokenBusca = var_token || token
        const workspaceIdBusca = var_workspace || workspaceId

        typebotApi.meusTypeBots(workspaceIdBusca, tokenBusca)
            .then(response => setItems(mapReduce(response.data.typebots)))
            .catch(() => toast.error('Erro ao carregar os typebots'))
    }, [token, workspaceId])

    useEffect(() => {
        configuracaoApi.getApiKeys()
            .then(response => {
                setWorkspaceId(response.data.typebot_workspaceId)
                setToken(response.data.typebot_token)
                buscarTypeBots(response.data.typebot_token, response.data.typebot_workspaceId)
            })
    }, [])

    useEffect(() => {
        if (!configuracoes) {
            configuracaoApi.getChaves()
                .then(response => {
                    setConfig(response.data)
                })
        }
    }, [configuracoes])

    const atualizarChaves = useCallback(() => {
        configuracaoApi.salvarTypeBotKeys(token, workspaceId)
        buscarTypeBots()
    }, [buscarTypeBots, configuracoes, token, workspaceId])

    const onEditClick = useCallback((item) => {
        if (item.published === 'PUBLICADO') {
            navigate(`viewer`, { replace: true, state: item })
            return
        }
        
        alert('Apenas typebots publicados podem ser editados')
    }, [navigate])

    const docs = (
        <>
            <Typography variant="h6">
                Onde encontro essas chaves de apis?
            </Typography>
            <Typography variant="body1">
                * Para gerar um novo Token <a href="https://docs.typebot.io/api-reference/authentication" target="_blank">Link</a>
            </Typography>
            <Typography variant="body1">
                * Clique em gerenciar meus TypeBots <a href={paths.typebot.manager} target="_blank">Link</a>
            </Typography>
            <Typography variant="body1">
                * Click em Settings & Members, depois clique em My account
            </Typography>
            <Typography variant="body1">
                * Clique em API tokens, em seguida, clique em Create token
            </Typography>
            <Typography variant="h6">
                Onde encontro o WorkspaceId
            </Typography>
            <Typography variant="body1">
                No seu dashboard do TypeBot clique em Settings & Members -- Workspace -- Settings
                e copie o WorkspaceId
            </Typography>
            <Typography variant="body1">
                <a href="https://docs.typebot.io/api-reference/how-to#how-to-find-my-workspaceid" target="_blank">Link</a>
            </Typography>
        </>
    )

    const formApiKeys = (
        <Box sx={{ p: 3 }}>
            <Grid
                container
            >
                <Grid
                    xs={12}
                    sm={6}
                    md={4}
                >
                    <TextField
                        label="token"
                        name="token"
                        type="password"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </Grid>
                <Grid
                    xs={12}
                    sm={6}
                    md={4}
                >
                    <TextField
                        label="workspaceId"
                        name="workspaceId"
                        type="password"
                        value={workspaceId}
                        onChange={(e) => setWorkspaceId(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Divider sx={{ pt: 2 }} />
            {docs}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2,
                }}
            >

                <Button
                    color="primary"
                    type="button"
                    variant="contained"
                    onClick={atualizarChaves}
                >
                    Atualizar chaves
                </Button>
            </Box>
        </Box>
    )

    const ApiKeys = (
        <Card
            variant="outlined">
            <CardHeader
                title="Minhas Api Keys"
            />
            <Divider />
            {formApiKeys}
        </Card>
    )

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
                    <Stack spacing={4}>
                        {ApiKeys}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Meus TypeBots
                                </Typography>
                            </Stack>

                        </Stack>

                        <Card>

                            <SimpleListTable
                                cellName={['id', 'icon', 'name', 'published']}
                                items={items}
                                onEditClick={onEditClick}
                            />
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default MeusTypeBotsPage