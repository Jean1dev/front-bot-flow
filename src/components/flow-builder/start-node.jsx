import React, { memo } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';

const sourceHandleStyleA = { left: 50 };
const sourceHandleStyleB = {
    right: 50,
    left: 'auto',
};

const StartNode = ({ data, xPos, yPos }) => {
    return (
        <>
            <NodeResizer />
            <Handle type="target" position={Position.Top} />
            <div>
                <div>
                    Gatilho de Inicio
                </div>
                <div>
                    Nome: <strong>{data.label}</strong>
                </div>
                <div>
                    Numero: <strong>{data?.phone}</strong>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={sourceHandleStyleA}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={sourceHandleStyleB}
            />
        </>
    );
};

export default memo(StartNode);
