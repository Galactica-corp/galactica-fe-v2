import { useMemo, useState } from "react";

import { useSessionStorage } from "@uidotdev/usehooks";
import { Edge, Node, NodeMouseHandler } from "reactflow";

import { PageLayout } from "pages/ui/page-layout";
import { useSuspenseSectionsQuery } from "shared/api";
import { QuestTree } from "shared/graphql";

import { Quest } from "../types";
import { Card } from "./quest/card";
import { Progress } from "./quest/progress";
import { Tree } from "./quest/tree";
import { QuestsTabs } from "./tabs";

// const paddingX = 200;
// const paddingY = 30;

// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));

// const nodeWidth = 90;
// const nodeHeight = 90;

export const SkillTreePage = () => {
  const { data: sections } = useSuspenseSectionsQuery();

  const [activeSectionId, setActiveSectionId] = useSessionStorage(
    "active-quest-sections",
    sections[0].id
  );
  const section = sections.find((s) => s.id === activeSectionId) ?? sections[0];

  const [questId, setQuestId] = useState<string>(
    section.questTree.quests.find((q) => q.status === "AVAILABLE")?.id ??
      section.questTree.quests[0].id
  );

  const activeQuest =
    section.questTree.quests.find((q) => q.id === questId) ??
    section.questTree.quests[0];

  const { nodes, edges } = useMemo(() => {
    return mapTree(section.questTree, questId);
  }, [section.questTree, questId]);

  const handleNodeClick: NodeMouseHandler = (e, node: Node<Quest>) => {
    if (node.data.status === "LOCKED") return;
    setQuestId(node.data.id);
  };

  return (
    <PageLayout title="Skill Wheel tasks">
      <QuestsTabs
        activeSectionId={activeSectionId}
        className="mt-6"
        onChange={setActiveSectionId}
      />

      <div className="mt-8 flex grow">
        <div className="relative flex grow basis-4/6 flex-col border-r border-black/10">
          <Progress
            className="absolute right-16 top-0 w-3/4"
            section={section}
          />
          <div className="flex h-3/4 min-h-[600px] grow">
            <Tree edges={edges} nodes={nodes} onNodeClick={handleNodeClick} />
          </div>
          {/* <div
            className="flex gap-x-9 self-center"
            onClick={() => {
              toast(
                <QuestToast
                  points={50}
                  questId="join"
                  questTitle="Join the Galactica Network"
                  sectionId="1-onboarding"
                  sectionTitle="Onboarding"
                />,
                { autoClose: 100000 }
              );
            }}
          >
            {section.rewards.map((r) => {
              return (
                <TrophyCard
                  category={"common"}
                  img={r.icon}
                  key={r.id}
                  text={r.title}
                />
              );
            })}
          </div> */}
        </div>

        <div className="basis-2/6 px-16">
          {activeQuest && <Card quest={activeQuest} section={section} />}
        </div>
      </div>
    </PageLayout>
  );
};

// function getLayoutedElements(
//   nodes: Node<Quest>[],
//   edges: Edge[],
//   direction = "TB"
// ) {
//   const isHorizontal = direction === "LR";
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   const newNodes = nodes.map((node, idx) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     const newNode: Node<Quest> = {
//       ...node,
//       targetPosition: isHorizontal ? Position.Left : Position.Top,
//       sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
//       // We are shifting the dagre node position (anchor=center center) to the top left
//       // so it matches the React Flow node anchor point (top left).
//       position: {
//         x: idx === 0 ? 20 : nodeWithPosition.x - nodeWidth / 2,
//         y: idx === 0 ? 0 : nodeWithPosition.y - nodeHeight / 2,
//       },
//     };

//     return newNode;
//   });

//   return { nodes: newNodes, edges };
// }

function mapTree(tree: QuestTree, activeQuestId: string) {
  const edges = tree.edges.map((e) => {
    const edge: Edge = {
      id: `${e.requirement}:${e.unlocks}`,
      source: e.requirement,
      target: e.unlocks,
      animated: true,
    };

    return edge;
  });

  const nodes = tree.quests.map((q) => {
    const node: Node<Quest> = {
      id: q.id,
      position: getPosition(q.id),
      // position: { x: 0, y: 0 },
      data: { ...q, isSelected: activeQuestId === q.id },
      type: "quest",
    };

    return node;
  });

  return { nodes, edges };

  // return getLayoutedElements(nodes, edges);
}

const getPosition = (id: string) => {
  if (id === "join") {
    return { x: 0, y: 0 };
  }

  if (id === "get-gnet") return { x: 700, y: 200 };

  if (id === "install-snap") return { x: 225, y: 200 };

  if (id === "pass-kyc") return { x: 375, y: 350 };
  if (id === "your-first-sbt") return { x: 375, y: 500 };

  if (id === "get-data-zkCert") return { x: 75, y: 350 };
  if (id === "generate-data-proof") return { x: 75, y: 500 };

  return { x: 0, y: 0 };
};
