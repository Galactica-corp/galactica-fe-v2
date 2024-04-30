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
        "flex items-center gap-x-3 overflow-hidden whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:bg-[#F3F3F2]/50",
        isActive && "bg-[#F3F3F2]/50",
        className
      )}
    >
      <Icon className="text-paleSky" name={iconName} />
      {children}
    </span>
  );
};
