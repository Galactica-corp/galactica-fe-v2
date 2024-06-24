import { useMemo } from "react";

import { type Edge, type Node, NodeTypes, ReactFlow } from "reactflow";

import { QuestNode } from "./quest-node";

import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "quest1",
    className: "cursor-default",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "questNode",
  },
  {
    id: "quest2",
    position: { x: 0, y: 500 },
    data: { label: "2" },
    type: "questNode",
  },
];
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
];

const proOptions = { hideAttribution: true };

export const QuestsTree = () => {
  const nodeTypes: NodeTypes = useMemo(() => ({ questNode: QuestNode }), []);

  return (
    <ReactFlow
      draggable={false}
      edges={initialEdges}
      fitView
      maxZoom={1}
      minZoom={1}
      nodeTypes={nodeTypes}
      nodes={initialNodes}
      nodesDraggable={false}
      onNodeClick={(e, node) => {
        // TODO: implement it
        console.log(node, "hello");
      }}
      panOnDrag={false}
      panOnScroll={false}
      // check it https://reactflow.dev/learn/troubleshooting/remove-attribution
      proOptions={proOptions}
    />
  );
};
