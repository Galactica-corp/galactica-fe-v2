import { Quest as BackendQuest } from "shared/graphql";

export type TrophyCategory = "common" | "rare";

export type Trophy = {
  category: TrophyCategory;
  id: string;
  img: string;
  text: string;
};

// type BackendQuest = {
//   buttonLink: string;
//   buttonText: string;
//   cardImage: string;
//   description: string;
//   link?: string;
//   linkText?: string;
//   nodeImage: string;
//   outlineNodeImage: string;
//   points: number | string;
//   status: QuestStatus;
//   title: string;
//   trophies?: Trophy[];
// };

export type UIQuest = {
  isSelected: boolean;
};

export type Action =
  | {
      text: "Clear storage";
      type: "clearStorage";
    }
  | {
      text: "clearStorage";
      type: "wallet_requestSnaps";
    }
  | {
      text: "hello world";
      type: "link";
      value: "http://...";
    };

export type Quest = BackendQuest & UIQuest;
