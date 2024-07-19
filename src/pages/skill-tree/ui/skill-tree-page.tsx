import { useMemo, useState } from "react";

import dagre from "@dagrejs/dagre";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Edge, Node, NodeMouseHandler, Position } from "reactflow";

import { PageLayout } from "pages/ui/page-layout";
import { useSuspenseSectionsQuery } from "shared/api";
import { QuestTree } from "shared/graphql";

import { Quest } from "../types";
import { Card } from "./quest/card";
import { Progress } from "./quest/progress";
import { Tree } from "./quest/tree";
import { QuestsTabs } from "./tabs";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 90;
const nodeHeight = 90;

export const SkillTreePage = () => {
  const { data: sections } = useSuspenseSectionsQuery();

  const [activeSectionId, setActiveSectionId] = useSessionStorage(
    "active-quest-sections",
    sections[0].id
  );
  const section = sections.find((s) => s.id === activeSectionId) ?? sections[0];

  const [quest, setQuest] = useState<Quest>({
    ...(section.questTree.quests.find((q) => q.status === "AVAILABLE") ??
      section.questTree.quests[0]),
    isSelected: true,
  });

  const { nodes, edges } = useMemo(() => {
    return mapTree(section.questTree, quest.id);
  }, [section.questTree, quest.id]);

  const handleNodeClick: NodeMouseHandler = (e, node: Node<Quest>) => {
    if (node.data.status === "LOCKED") return;
    setQuest(node.data);
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
                  sectionId="onboarding"
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
          {quest && <Card quest={quest} section={section} />}
        </div>
      </div>
    </PageLayout>
  );
};

function getLayoutedElements(
  nodes: Node<Quest>[],
  edges: Edge[],
  direction = "TB"
) {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode: Node<Quest> = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
}

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
      position: { x: 351, y: 350 },
      data: { ...q, isSelected: activeQuestId === q.id },
      type: "quest",
    };

    return node;
  });

  return getLayoutedElements(nodes, edges);
}
