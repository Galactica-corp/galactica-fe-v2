export type QuestName =
  | "cypher-state"
  | "data-dimension"
  | "lp-dimension"
  | "onboarding"
  | "partner"
  | "referrer"
  | "sentinels";

export type QuestStatus = "available" | "completed" | "locked";

export type TrophyCategory = "common" | "rare";

export type Trophy = {
  category: TrophyCategory;
  id: string;
  img: string;
  text: string;
};

type BackendQuest = {
  buttonLink: string;
  buttonText: string;
  cardImage: string;
  description: string;
  nodeImage: string;
  outlineNodeImage: string;
  points: number | string;
  status: QuestStatus;
  title: string;
  trophies: Trophy[];
};

export type UIQuest = {
  isSelected: boolean;
};

export type Quest = BackendQuest & UIQuest;
