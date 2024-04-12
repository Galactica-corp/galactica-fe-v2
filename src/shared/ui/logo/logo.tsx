import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { default as LogoSvg } from "./logo.svg?react";

export const Logo = ({ className }: ClassName) => {
  return (
    <div className={twMerge("flex items-center", className)}>
      <LogoSvg />
    </div>
  );
};
