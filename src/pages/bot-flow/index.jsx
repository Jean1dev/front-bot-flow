import React, { useCallback, useState } from "react"

import { Plus as PlusIcon, Upload01 } from '@untitled-ui/icons-react/build/esm';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon,
    Card,
} from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2';

import { Seo } from "src/components/seo";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import { AddNodeDialog } from "src/components/flow-builder/add-node-dialog";

import startNode from "../../components/flow-builder/start-node";
import { LinkNumberDialog } from "../../components/flow-builder/link-number-dialog";
import axios from 'axios';

import 'reactflow/dist/style.css';
import { BaseUrlApiEngine } from "../../constants";
import { toast } from 'react-hot-toast';

const FLOW_STEP_START = 'start'
const FLOW_STEP_ONGOING = 'ongoing'
const FLOW_STEP_FINISH = 'finish'

const minimapStyle = {
    height: 120,
};

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
    start: startNode,
};

const BotFlowView = () => {
    const [open, setOpen] = useState(false)
    const [openModalLinkNumber, setOpenModalLinkNumber] = useState(false)
    const [title, setTitle] = useState('Criar novo Flow')
    const [flowFlux, setFlowFlux] = useState(FLOW_STEP_START)

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const confirmLinkNumber = useCallback((codeConfirmation) => {
        axios.post(`${BaseUrlApiEngine}/poc/whats/engine-run`, {
            key: codeConfirmation,
            edges,
            nodes
        }).then(() => {
            toast.success('Flow adicionado e ja esta ativo')
        }).catch((e) => {
            toast.error('Ocorreu um erro ao adicionar esse Flow')
            console.log(e.message)
        })
    }, [nodes, edges])

    const addNode = useCallback((data) => {
        const yVal = nodes.length === 0 ? 0 : 100 * nodes.length
        const id = `node-${nodes.length}`

        if (flowFlux === FLOW_STEP_START) {
            setNodes([{
                id, type: 'start', position: { x: 0, y: yVal }, data: {
                    label: data.name,
                    phone: data.phone,
                    action: data.action
                }
            }])
            setTitle('Adicionar nova acao')
            setFlowFlux(FLOW_STEP_ONGOING)
            return

        }

        setNodes([...nodes, { id, position: { x: 0, y: yVal }, data: { label: data.name, action: data.action } }])

    }, [nodes, flowFlux])

    const importFile = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const arquivoSelecionado = event.target.files[0];
            const leitor = new FileReader();

            leitor.onload = (eventoLeitura) => {
                const conteudoArquivo = eventoLeitura.target.result;
                const objetoJson = JSON.parse(conteudoArquivo);

                if (!objetoJson.nodes) {
                    alert('Arquivo no formato invalido')
                    return
                }

                setNodes(objetoJson.nodes)
                setEdges(objetoJson.edges)
                setTitle('Adicionar nova acao')
                setFlowFlux(FLOW_STEP_ONGOING)
            };

            leitor.readAsText(arquivoSelecionado);
        };

        input.click();
    }, [])

    const testar = () => {
        const content = {
            key: 'teste',
            edges,
            nodes
        }

        const blob = new Blob([JSON.stringify(content)], {
            type: 'application/json'
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'flow.json'
        link.click()
        URL.revokeObjectURL(url)
        setOpenModalLinkNumber(true)
    }

    return (
        <>
            <Seo title="Bot Flow" />
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}>
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Box sx={{ p: 3 }}>
                            <Stack
                                alignItems="flex-start"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <div>
                                    <Typography variant="h4">
                                        Whatsapp Bot Flow
                                    </Typography>
                                </div>
                                <Grid xs={12}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        spacing={4}
                                    >
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                        >

                                            {
                                                nodes.length > 0 && (
                                                    <Button
                                                        onClick={testar}
                                                        variant="outlined"
                                                    >
                                                        Testar
                                                    </Button>
                                                )
                                            }

                                            <Button
                                                onClick={importFile}
                                                startIcon={(
                                                    <SvgIcon>
                                                        <Upload01 />
                                                    </SvgIcon>
                                                )}
                                                variant="outlined"
                                            >
                                                Importar
                                            </Button>

                                            <Button
                                                onClick={() => setOpen(true)}
                                                startIcon={(
                                                    <SvgIcon>
                                                        <PlusIcon />
                                                    </SvgIcon>
                                                )}
                                                variant="contained"
                                            >
                                                {title}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Grid>


                            </Stack>
                        </Box>
                        <Card>
                            <div style={{ width: '100vw', height: '80vh' }}>
                                <ReactFlow
                                    fitView
                                    nodes={nodes}
                                    edges={edges}
                                    nodeTypes={nodeTypes}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    onConnect={onConnect}
                                    defaultEdgeOptions={{
                                        animated: true,
                                        type: 'smoothstep',
                                    }}
                                >
                                    <Controls />
                                    <MiniMap style={minimapStyle} zoomable pannable />
                                    <Background variant="dots" gap={12} size={1} />
                                </ReactFlow>
                            </div>
                        </Card>
                    </Stack>
                </Container>
            </Box>
            <AddNodeDialog
                onClose={() => setOpen(false)}
                open={open}
                onConfirm={addNode}
                phase={flowFlux}
            />
            <LinkNumberDialog
                onClose={() => setOpenModalLinkNumber(false)}
                open={openModalLinkNumber}
                onSubmit={confirmLinkNumber}
            />
        </>
    )
}

export default BotFlowView