import { useMemo, useState } from "react";

import { useSessionStorage } from "@uidotdev/usehooks";
import { Edge, Node, NodeMouseHandler } from "reactflow";

import { PageLayout } from "pages/ui/page-layout";
import { QuestTree, useSuspenseSectionsQuery } from "shared/graphql";

import { Quest } from "../types";
import { Card } from "./quest/card";
import { Progress } from "./quest/progress";
import { Tree } from "./quest/tree";
import { QuestsTabs } from "./tabs";
import { TrophyCard } from "./trophy-card";

/** TODO
 * sections order
 * coords
 * */

export const SkillTreePage = () => {
  const { data } = useSuspenseSectionsQuery(undefined);

  const [activeSectionId, setActiveSectionId] = useSessionStorage(
    "active-quest-sections",
    data.sections[0].id
  );
  const section =
    data.sections.find((s) => s.id === activeSectionId) ?? data.sections[0];

  const [quest, setQuest] = useState<Quest>({
    ...section.questTree.quests[0],
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
          <div className="flex gap-x-9 self-center">
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
          </div>
        </div>

        <div className="basis-2/6 px-16">{quest && <Card quest={quest} />}</div>
      </div>
    </PageLayout>
  );
};

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

  return { edges, nodes };
}
