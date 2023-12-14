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
import FlowBuilder from "src/components/flow-builder";
import { AddNodeDialog } from "src/components/flow-builder/add-node-dialog";

const BotFlowView = () => {
    const [open, setOpen] = useState(false)
    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    const addNode = useCallback((data) => {
        const yVal = nodes.length === 0 ? 0 : 100 * nodes.length
        const id = `node-${nodes.length}`
        setNodes([...nodes, { id, position: { x: 0, y: yVal }, data: { label: data.name } }])
    }, [nodes, edges])

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
                                    <Button
                                        onClick={() => setOpen(true)}
                                        startIcon={(
                                            <SvgIcon>
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </Stack>
                        </Box>
                        <Card>
                            <FlowBuilder
                                nodes={nodes}
                                edges={edges}
                            />
                        </Card>
                    </Stack>
                </Container>
            </Box>
            <AddNodeDialog
                onClose={() => setOpen(false)}
                open={open}
                onConfirm={addNode}
            />
        </>
    )
}

export default BotFlowView