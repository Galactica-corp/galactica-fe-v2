import { ElementType, ReactNode } from "react";

import { ClassName, PolymorphicProps } from "shared/types";

import { CollapseContext, useCollapseCtx } from "./context";

type Props = {
  children?: ((props: CollapseContext) => ReactNode) | ReactNode;
} & ClassName;

export const Trigger = <Element extends ElementType = "button">(
  props: PolymorphicProps<Element, Props>
) => {
  const { as: Comp = "button", children, className } = props;
  const { setIsOpen, isOpen } = useCollapseCtx();

  return (
    <Comp className={className} onClick={() => setIsOpen((isOpen) => !isOpen)}>
      {typeof children === "function"
        ? children?.({ isOpen, setIsOpen })
        : children}
    </Comp>
  );
};
