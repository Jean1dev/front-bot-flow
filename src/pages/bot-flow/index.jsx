import React, { useCallback, useState } from "react"

import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    SvgIcon,
    Card
} from '@mui/material'

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
import 'reactflow/dist/style.css';
import startNode from "../../components/flow-builder/start-node";

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
    const [title, setTitle] = useState('Criar novo Flow')
    const [flowFlux, setFlowFlux] = useState(FLOW_STEP_START)

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const addNode = useCallback((data) => {
        const yVal = nodes.length === 0 ? 0 : 100 * nodes.length
        const id = `node-${nodes.length}`
        console.log(data)
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

    const testar = () => {
        console.log('nodes')
        console.log(nodes)
        console.log('edges')
        console.log(edges)
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
                                <div>
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
                                </div>
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
        </>
    )
}

export default BotFlowView