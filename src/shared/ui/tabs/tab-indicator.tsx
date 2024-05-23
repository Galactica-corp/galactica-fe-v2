import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

type Props = ClassName & {
  isActive?: boolean;
};

export const TabIndicator = ({
  children,
  isActive,
}: PropsWithChildren<Props>) => {
  return (
    <span
      className={twMerge(
        "inline-flex size-5 items-center justify-center rounded-full border border-alabaster bg-white text-xs text-pickledBluewood",
        isActive && "border-mistyRose text-basketBallOrange"
      )}
    >
      {children}
    </span>
  );
};
