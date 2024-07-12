import { ElementType, PropsWithChildren, useContext } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

import { TabsContext } from "./context";

type Props = {
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
} & ClassName;

export const Tab = <E extends ElementType = "li">(
  props: PropsWithChildren<PolymorphicProps<E, Props>>
) => {
  const {
    as: Comp = motion.li,
    children,
    className,
    isActive: isActiveProp = false,
    onClick,
    disabled,
    ...restProps
  } = props;

  const { lineLayoutId } = useContext(TabsContext);

  const isActive = isActiveProp;

  return (
    <Comp
      className={twMerge(
        "relative flex cursor-pointer items-center gap-x-2 pb-3 text-sm text-mistBlue transition",
        isActive && "text-basketBallOrange",
        disabled && "text-aluminium",
        className
      )}
      onClick={onClick}
      style={{
        WebkitTapHighlightColor: "transparent",
      }}
      {...restProps}
    >
      {children}
      {isActive && (
        <motion.span
          className="absolute inset-x-0 -bottom-px z-10 h-0.5 bg-basketBallOrange"
          layoutId={`line-${lineLayoutId}`}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Comp>
  );
};
