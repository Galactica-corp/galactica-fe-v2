import { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

import { SIZES } from "./styles";
import * as ICONS from "./svg";

export type Name = keyof typeof ICONS;
export type Size = keyof typeof SIZES;

type Props = {
  name: Name;
  safeArea?: "0" | "2" | "4";
  size?: Size;
  svgClassName?: string;
} & ComponentProps<"span">;

export const Icon = ({
  className,
  name,
  safeArea = "0",
  size = "20",
  svgClassName,
  ...props
}: Props) => {
  const IconElement = ICONS[name];

  return (
    <span
      className={twMerge(
        "box-content flex items-center",
        safeArea === "2" && "p-0.5",
        safeArea === "4" && "p-1",
        SIZES[size],
        className
      )}
      {...props}
    >
      {<IconElement className={twMerge("size-full", svgClassName)} />}
    </span>
  );
};
