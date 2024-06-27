import { PropsWithChildren, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

type Props = {
  title?: ReactNode;
} & ClassName;

export const PageLayout = ({
  className,
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={twMerge("flex grow flex-col p-8", className)}>
      <h1 className="text-3xl font-semibold">{title}</h1>
      {children}
    </div>
  );
};
