import { CSSProperties } from "react";

import { Handle, NodeProps, Position } from "reactflow";

import imagePng from "./image.png";

type Data = {
  label: "hello";
};

const style: CSSProperties = {
  background: "transparent",
  border: "none",
};

export const QuestNode = ({ data, id }: NodeProps<Data>) => {
  return (
    <>
      <Handle
        position={Position.Top}
        style={{ ...style, top: 10 }}
        type="target"
      />
      <div className="size-20" onClick={() => {}}>
        <img className="cursor-default" src={imagePng} />
      </div>
      <Handle
        id="a"
        position={Position.Bottom}
        style={{ ...style, bottom: 10 }}
        type="source"
      />
    </>
  );
};
