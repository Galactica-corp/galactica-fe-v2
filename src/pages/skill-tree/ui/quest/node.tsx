import { CSSProperties } from "react";

import { useHover } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { Handle, NodeProps, Position } from "reactflow";
import { twMerge } from "tailwind-merge";

import { Status } from "shared/graphql";
import { Icon } from "shared/ui/icon";

import { Quest } from "../../types";

const style: CSSProperties = {
  background: "transparent",
  border: "none",
  // top: "50%",
  // transform: "translateY(-50%)",
};

const imgStyles: CSSProperties = {
  maskImage: "/quests/entry/outline.svg",
};

export const Node = ({ data }: NodeProps<Quest>) => {
  const [ref, hovering] = useHover();
  const { id, isSelected, status, points } = data;

  return (
    <>
      <Handle
        id="target"
        position={Position.Top}
        style={{ ...style, top: 15 }}
        type="target"
      />
      <Handle
        id="source"
        position={Position.Bottom}
        style={{
          ...style,
          bottom: 20,
        }}
        type="source"
      />
      <div
        className={twMerge(
          "relative flex size-[90px] cursor-pointer items-center justify-center",
          status === "LOCKED" && "cursor-default"
        )}
        ref={ref}
      >
        {status === "COMPLETED" && (
          <Icon
            className="absolute right-1 top-3 z-10 size-5 rounded-full bg-white p-0.5"
            name="verifiedCheck"
          />
        )}

        <div
          className={twMerge(
            "absolute -left-1 bottom-0 z-10 flex h-[20px] items-center justify-center gap-x-0.5 rounded-2xl border border-geyser bg-white px-2 py-0.5 text-xs font-semibold text-aluminium",
            status === "AVAILABLE" &&
              "border-basketBallOrange/30 text-basketBallOrange"
          )}
        >
          {getPoints(points, status)}{" "}
          <Icon className="size-3" name="lightning" />
        </div>
        <AnimatePresence>
          {status !== "LOCKED" && (hovering || isSelected) && (
            <motion.img
              animate={{ opacity: 1 }}
              className="absolute -z-10 size-[90]"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              src={`/quests/${id}/outline.svg`}
            />
          )}
        </AnimatePresence>

        <img
          className={twMerge(
            "size-[80px]",
            status === "COMPLETED" && "grayscale",
            status === "LOCKED" && "opacity-50 contrast-0"
          )}
          src={`/quests/${id}/node.png`}
          style={imgStyles}
        />
      </div>
    </>
  );
};

function getPoints(points: number | string, status: Status) {
  if (status === "LOCKED") return `+???`;
  if (status === "AVAILABLE") return `+${points}`;
  if (status === "COMPLETED") return points;
}
