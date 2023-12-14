import React, { useCallback, useEffect } from "react"
import PropTypes from 'prop-types';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const minimapStyle = {
    height: 120,
  };

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const FlowBuilder = (props) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    useEffect(() => {
        console.log(props)
        setNodes(props.nodes)
        setEdges(props.edges)
    }, [props])

    return (
        <>
            <div style={{ width: '100vw', height: '80vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
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
        </>
    )
}

FlowBuilder.propTypes = {
    nodes: PropTypes.array,
    edges: PropTypes.array
}

export default FlowBuilder