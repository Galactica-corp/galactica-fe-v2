import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Icon, IconName } from "shared/ui/icon";

type Props = { iconName: IconName; isActive?: boolean } & ClassName;

export const Item = (props: PropsWithChildren<Props>) => {
  const { className, iconName, children, isActive } = props;

  return (
    <span
      className={twMerge(
        "flex grow items-center gap-x-3 overflow-hidden whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:bg-desertStorm/50",
        isActive && "bg-desertStorm/50",
        className
      )}
    >
      <Icon className="shrink-0 text-paleSky" name={iconName} />
      {children}
    </span>
  );
};
