import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

type Props = {
  avatarUrl?: string;
} & ClassName;

export const Avatar = ({ className, avatarUrl }: Props) => {
  return (
    <div
      className={twMerge(
        "flex size-10 shrink-0 rounded-xl bg-desertStorm bg-cover bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: `url(${avatarUrl})`,
      }}
    />
  );
};
