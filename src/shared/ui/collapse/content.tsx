import { ElementType, PropsWithChildren } from "react";

import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

import { useCollapseCtx } from "./context";

export const Content = <Element extends ElementType>(
  props: PolymorphicProps<Element, PropsWithChildren<ClassName>>
) => {
  const { as: Comp = "div", className, children } = props;
  const { isOpen, keepMount } = useCollapseCtx();

  return (
    <Comp
      className={twMerge(
        "grid grid-rows-[0fr] overflow-hidden",
        isOpen && "grid-rows-[1fr]",
        className
      )}
      style={{
        transition: "grid-template-rows .1s linear",
      }}
    >
      <div className="min-h-0">
        <AnimatePresence>
          {(isOpen || keepMount) && (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              variants={variants}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Comp>
  );
};

const variants: AnimationProps["variants"] = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
