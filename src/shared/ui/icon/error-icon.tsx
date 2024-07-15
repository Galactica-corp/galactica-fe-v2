import { twJoin } from "tailwind-merge";

import { ClassName } from "shared/types";

import { Icon } from "./icon";

export const ErrorIcon = ({ className }: ClassName) => {
  return (
    <Icon
      className={twJoin(
        "relative size-5 shrink-0 text-grapefruit",
        "after:absolute after:left-1/2 after:top-1/2 after:flex after:size-7 after:-translate-x-1/2 after:-translate-y-1/2 after:animate-pulse after:rounded-full after:border-2 after:border-grapefruit after:opacity-30",
        "before::animate-pulse before:absolute before:left-1/2 before:top-1/2 before:flex before:size-9 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-2 before:border-grapefruit before:opacity-10",
        className
      )}
      name="alertCircle"
      style={{
        animation: "infinite waves",
      }}
    />
  );
};
