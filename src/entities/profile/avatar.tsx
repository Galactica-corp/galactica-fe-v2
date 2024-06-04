import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import defaultAvatarPng from "./default-avatar.png";

type Props = {
  avatarUrl?: string;
} & ClassName;

export const Avatar = ({ className, avatarUrl = defaultAvatarPng }: Props) => {
  return (
    <div
      className={twMerge(
        "flex size-10 shrink-0 rounded-xl bg-softPeach bg-cover bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url(${avatarUrl})`,
      }}
    />
  );
};
