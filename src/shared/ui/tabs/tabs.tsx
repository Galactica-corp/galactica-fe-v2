import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

type Props = ClassName;

export const Tabs = <E extends ElementType = "ul">(
  props: PropsWithChildren<PolymorphicProps<E, Props>>
) => {
  const { as: Comp = "ul", children, className, ...restProps } = props;

  return (
    <Comp
      {...restProps}
      className={twMerge("flex gap-x-3 border-b border-iron", className)}
    >
      {children}
    </Comp>
  );
};
