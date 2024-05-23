import { ElementType, PropsWithChildren, useId } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

import { TabsContext } from "./context";

export const Tabs = <E extends ElementType = "ul">(
  props: PropsWithChildren<PolymorphicProps<E, ClassName>>
) => {
  const { as: Comp = "ul", children, className, ...restProps } = props;
  const lineLayoutId = useId();

  return (
    <Comp
      {...restProps}
      className={twMerge("flex gap-x-3 border-b border-iron", className)}
    >
      <TabsContext.Provider value={{ lineLayoutId: lineLayoutId }}>
        {children}
      </TabsContext.Provider>
    </Comp>
  );
};
