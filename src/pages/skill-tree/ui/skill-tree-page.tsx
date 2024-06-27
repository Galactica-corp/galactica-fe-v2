import { useMemo, useState } from "react";

import { Edge, Node, NodeMouseHandler } from "reactflow";

import { PageLayout } from "pages/ui/page-layout";

import nodeImagePng from "../assets/active-image.png";
import cardImagePng from "../assets/card-image.png";
import outlineImagePng from "../assets/outline.svg";
import trophyImagePng from "../assets/trophy-image.png";
import { Quest, QuestName } from "../types";
import { Card } from "./quest/card";
import { Progress } from "./quest/progress";
import { Tree } from "./quest/tree";
import { QuestsTabs } from "./tabs";
import { TrophyCard } from "./trophy-card";

const questData: Quest = {
  trophies: [
    {
      id: "trophy1",
      category: "common",
      img: trophyImagePng,
      text: "Trophy for those who complete Onboarding at least 60%",
    },
    {
      id: "trophy2",
      img: trophyImagePng,
      category: "rare",
      text: "Trophy for those who complete Onboarding at least 60%",
    },
  ],
  isSelected: false,
  buttonLink: "#",
  buttonText: "Install Snap",
  description: `Snap is an extension to your Metamask that Galactica will use to store zk stuff. All your data - on your machine.`,
  cardImage: cardImagePng,
  outlineNodeImage: outlineImagePng,
  nodeImage: nodeImagePng,
  title: "Install Snap",
  points: "25",
  status: "completed",
};

const initialNodes: Node<Quest>[] = [
  {
    id: "quest1",
    position: { x: 0, y: 0 },
    data: questData,
    type: "quest",
  },
  {
    id: "quest2",
    position: { x: 100, y: 100 },
    data: {
      ...questData,
      points: 30,
      title: "Pass KYC",
      status: "available",
      description:
        "You need a KYC for many reasons on Galactica. Get one to start your journey!",
    },
    type: "quest",
  },
  {
    id: "quest3",
    position: { x: 100, y: 300 },
    data: {
      ...questData,
      points: 30,
      title: "Pass KYC",
      status: "locked",
      description:
        "You need a KYC for many reasons on Galactica. Get one to start your journey!",
    },
    type: "quest",
  },
];

const initialEdges: Edge[] = [
  {
    id: "1-2",
    source: "quest1",
    target: "quest2",
    animated: true,
  },
];

export const SkillTreePage = () => {
  const [node, setNode] = useState<Node<Quest>>(initialNodes[0]);
  const [activeQuestSection, setActiveQuestSection] =
    useState<QuestName>("onboarding");

  const handleNodeClick: NodeMouseHandler = (e, node: Node<Quest>) => {
    if (node.data.status === "locked") return;
    setNode(node);
  };

  const nodes: Node<Quest>[] = useMemo(() => {
    return initialNodes.map((n): Node<Quest> => {
      const isSelected = node.id === n.id;

      return { ...n, data: { ...n.data, isSelected } };
    });
  }, [node]);

  return (
    <PageLayout title="Skill Wheel tasks">
      <QuestsTabs
        activeQuestSection={activeQuestSection}
        className="mt-6"
        onChange={setActiveQuestSection}
      />

      <div className="mt-8 flex grow">
        <div className="relative flex basis-4/6 flex-col border-r border-black/10">
          <Progress className="absolute right-16 top-0 w-3/4" />
          <div className="flex h-3/4">
            <Tree
              edges={initialEdges}
              nodes={nodes}
              onNodeClick={handleNodeClick}
            />
          </div>
          <div className="flex gap-x-9 self-center">
            {node.data.trophies.map((trophy) => {
              return (
                <TrophyCard
                  category={trophy.category}
                  img={trophyImagePng}
                  key={trophy.id}
                  text={trophy.text}
                />
              );
            })}
          </div>
        </div>

        <div className="basis-2/6 px-16">
          {node && <Card {...node.data} imageLink={node.data.cardImage} />}
        </div>
      </div>
    </PageLayout>
  );
};
