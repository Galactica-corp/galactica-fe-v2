import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Icon } from "shared/ui/icon";

type Props = {
  label: string;
  value: number | string;
} & ClassName;

export const Points = ({ label = "Reward:", value, className }: Props) => {
  return (
    <div
      className={twMerge(
        "flex h-[30px] items-center whitespace-nowrap rounded bg-basketBallOrange/10 px-2.5 py-1.5 text-sm text-basketBallOrange shadow-xs",
        className
      )}
    >
      {label}
      <span className="ml-1 font-semibold">{value}</span>
      <Icon className="size-3" name="lightning" />
    </div>
  );
};
