import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { Icon } from "../icon";
import { default as LogoSvg } from "./logo.svg?react";

type Props = {
  isSmall?: boolean;
  onClick?: () => void;
} & ClassName;

export const Logo = ({ className, isSmall, onClick }: Props) => {
  return (
    <div className={twMerge("flex items-center", className)} onClick={onClick}>
      {isSmall ? <Icon className="size-8" name="galactica" /> : <LogoSvg />}
    </div>
  );
};
