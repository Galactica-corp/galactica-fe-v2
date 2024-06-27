import { useMemo } from "react";

import {
  type Edge,
  type Node,
  NodeMouseHandler,
  NodeTypes,
  ReactFlow,
} from "reactflow";

import { ClassName } from "shared/types";

import { Quest } from "../../types";
import { Node as QuestNode } from "./node";

import "reactflow/dist/style.css";

const proOptions = { hideAttribution: true };

type Props = {
  edges: Edge[];
  nodes: Node<Quest>[];
  onNodeClick: NodeMouseHandler;
} & ClassName;

export const Tree = (props: Props) => {
  const { onNodeClick, nodes, edges } = props;
  const nodeTypes: NodeTypes = useMemo(() => ({ quest: QuestNode }), []);

  return (
    <ReactFlow
      draggable={false}
      edges={edges}
      maxZoom={1}
      minZoom={1}
      nodeTypes={nodeTypes}
      nodes={nodes}
      nodesDraggable={false}
      onNodeClick={onNodeClick}
      // panOnDrag={false}
      panOnScroll={false}
      // check it https://reactflow.dev/learn/troubleshooting/remove-attribution
      proOptions={proOptions}
      style={{
        cursor: "default",
        height: "75%",
      }}
    />
  );
};
