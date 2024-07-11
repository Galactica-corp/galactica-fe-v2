import { useMemo, useState } from "react";

import { Edge, Node, NodeMouseHandler } from "reactflow";

import { PageLayout } from "pages/ui/page-layout";

import trophyImagePng from "../assets/trophy-image.png";
import { Quest, QuestName } from "../types";
import { Card } from "./quest/card";
import { Progress } from "./quest/progress";
import { Tree } from "./quest/tree";
import { QuestsTabs } from "./tabs";
import { TrophyCard } from "./trophy-card";

const initialNodes: Node<Quest>[] = [
  {
    id: "entry",
    position: { x: 0, y: 0 },
    data: {
      isSelected: false,
      buttonLink: "#",
      buttonText: "Entry",
      cardImage: "/quests/entry/card.png",
      description: "Description",
      status: "completed",
      nodeImage: "/quests/entry/node.png",
      outlineNodeImage: "/quests/entry/outline.svg",
      title: "Title",
      points: 50,
    },
    type: "quest",
  },
  {
    id: "get-gnet",
    position: { x: 700, y: 100 },
    data: {
      isSelected: false,
      buttonLink: "#",
      buttonText: "Get GNET",
      description:
        "You will anyway need some cash for your journey. You can get some already and don't think about it later.",
      title: "Get some GNET",
      points: 75,
      status: "available",
      cardImage: "/quests/get-gnet/card.png",
      nodeImage: "/quests/get-gnet/node.png",
      outlineNodeImage: "/quests/get-gnet/outline.svg",
    },
    type: "quest",
  },
  {
    id: "install-snap",
    position: { x: 200, y: 100 },
    data: {
      isSelected: false,
      link: "#",
      linkText: "Learn more",
      buttonLink: "https://snaps.metamask.io/snap/npm/galactica-net/snap/",
      buttonText: "Install snap",
      description:
        "Snap is an extension to your Metamask that Galactica will use to store zk stuff. All your data - on your machine.",
      title: "Install Snap",
      points: 25,
      status: "available",
      cardImage: "/quests/install-snap/card.png",
      nodeImage: "/quests/install-snap/node.png",
      outlineNodeImage: "/quests/install-snap/outline.svg",
    },
    type: "quest",
  },
  {
    id: "pass-kyc",
    position: { x: 50, y: 200 },
    data: {
      isSelected: false,
      link: "#",
      linkText: "Learn more",
      buttonLink: "/kyc-providers",
      buttonText: "Go to KYC Providers",
      description:
        "You need a KYC for many reasons on Galactica. Get one to start your journey!",
      title: "Pass KYC",
      points: 200,
      status: "available",
      cardImage: "/quests/pass-kyc/card.png",
      nodeImage: "/quests/pass-kyc/node.png",
      outlineNodeImage: "/quests/pass-kyc/outline.svg",
    },
    type: "quest",
  },
  {
    id: "first-social-zk-cert",
    position: { x: 350, y: 200 },
    data: {
      link: "#",
      linkText: "Learn more",
      isSelected: false,
      buttonLink: "/data-providers",
      buttonText: "Go to Data Providers",
      description:
        "The Data Guradians can import pretty mych any info to Galactica. It is always stored in a zk-way, so only you will hold it, until you decide to share it. Go and get your first data zkCert with you social networks account.",
      title: "Get your first social zkCert",
      points: 125,
      status: "available",
      cardImage: "/quests/first-social-zk-cert/card.png",
      nodeImage: "/quests/first-social-zk-cert/node.png",
      outlineNodeImage: "/quests/first-social-zk-cert/outline.svg",
    },
    type: "quest",
  },
  {
    id: "first-sbt",
    position: { x: 50, y: 350 },
    data: {
      link: "#",
      linkText: "Learn more",
      isSelected: false,
      buttonLink: "/kyc-providers",
      buttonText: "Generate KYC proof",
      description:
        "You remember that only you have access to the data in your zkCerts? So nobody even know that you hold a KYC. You need to prove it! Without disclosing personal data, of course.",
      title: "Your first SBT",
      points: 150,
      status: "available",
      cardImage: "/quests/first-sbt/card.png",
      nodeImage: "/quests/first-sbt/node.png",
      outlineNodeImage: "/quests/first-sbt/outline.svg",
    },
    type: "quest",
  },
  {
    id: "not-robot",
    position: { x: 351, y: 350 },
    data: {
      link: "#",
      linkText: "Learn more",
      isSelected: false,
      buttonLink: "/kyc-providers",
      buttonText: "Generate Data proof",
      description:
        "If you did KYC already, you know that a proof is needed to make others know you did. Without a proof published on-chain, only you have access to your data. Let's generate a proof that you have a social account(s), without disclosing any other details.",
      title: "I'm not a robot",
      points: 50,
      status: "available",
      cardImage: "/quests/not-robot/card.png",
      nodeImage: "/quests/not-robot/node.png",
      outlineNodeImage: "/quests/not-robot/outline.svg",
    },
    type: "quest",
  },
];

const initialEdges: Edge[] = [
  {
    id: "entry:install-snap",
    source: "entry",
    target: "install-snap",
    animated: true,
  },
  {
    id: "entry:get-gnet",
    source: "entry",
    target: "get-gnet",
    animated: true,
  },
  {
    id: "install-snap:pass-kyc",
    source: "install-snap",
    target: "pass-kyc",
    animated: true,
  },
  {
    id: "pass-kyc:first-sbt",
    source: "pass-kyc",
    target: "first-sbt",
    animated: true,
  },
  {
    id: "install-snap:first-social-zk-cert",
    source: "install-snap",
    target: "first-social-zk-cert",
    animated: true,
  },
  {
    id: "first-social-zk-cert:not-robot",
    source: "first-social-zk-cert",
    target: "not-robot",
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
        <div className="relative flex grow basis-4/6 flex-col border-r border-black/10">
          <Progress className="absolute right-16 top-0 w-3/4" />
          <div className="flex h-3/4 min-h-[600px] grow">
            <Tree
              edges={initialEdges}
              nodes={nodes}
              onNodeClick={handleNodeClick}
            />
          </div>
          <div className="flex gap-x-9 self-center">
            {node.data.trophies?.map((trophy) => {
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
