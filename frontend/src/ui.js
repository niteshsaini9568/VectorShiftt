import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { DelayNode } from './nodes/delayNode';
import { JSONNode } from './nodes/jsonNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  math: MathNode,
  filter: FilterNode,
  delay: DelayNode,
  json: JSONNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  pipelineStatus: state.pipelineStatus,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    pipelineStatus,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const edgeColor =
    pipelineStatus === 'dag'
      ? '#22c55e'
      : pipelineStatus === 'cycle'
        ? '#ef4444'
        : '#e2e8f0';

  const styledEdges = edges.map((edge) => ({
    ...edge,
    animated: true,
    style: {
      ...(edge.style || {}),
      stroke: edgeColor,
      strokeWidth: 2.2,
    },
    markerEnd: {
      ...(edge.markerEnd || {}),
      color: edgeColor,
    },
  }));

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const rawData = event?.dataTransfer?.getData('application/reactflow');
      if (!rawData) return;

      const { nodeType: type } = JSON.parse(rawData);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="relative z-[1] h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: '#f8fafc', strokeWidth: 2.2 }}
        fitView
      >
        <Background color="#1f2937" gap={gridSize} variant="dots" />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const map = {
              customInput: '#22c55e',
              customOutput: '#f97316',
              llm: '#a78bfa',
              text: '#06b6d4',
              api: '#38bdf8',
              math: '#fb923c',
              filter: '#f43f5e',
              delay: '#facc15',
              json: '#34d399',
            };
            return map[n.type] || '#4f7ef8';
          }}
          maskColor="#0f1117cc"
        />
      </ReactFlow>
    </div>
  );
};
