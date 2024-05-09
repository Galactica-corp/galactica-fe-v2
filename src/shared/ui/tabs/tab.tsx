import { ElementType, PropsWithChildren } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

type Props<V> = {
  isActive?: boolean;
  onClick?: (value: V) => void;
  value: V;
} & ClassName;

export const Tab = <E extends ElementType = "li", V = void>(
  props: PropsWithChildren<PolymorphicProps<E, Props<V>>>
) => {
  const {
    as: Comp = motion.li,
    children,
    className,
    isActive = false,
    onClick,
    value,
    ...restProps
  } = props;

  return (
    <Comp
      className={twMerge(
        "relative flex cursor-pointer items-center pb-3 text-sm text-mistBlue transition",
        isActive && "text-basketBallOrange",
        className
      )}
      onClick={() => {
        onClick?.(value);
      }}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      {...restProps}
    >
      {children}
      {isActive && (
        <motion.span
          className="absolute inset-x-0 -bottom-px z-10 h-0.5 bg-basketBallOrange"
          layoutId="bubble"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Comp>
  );
};
