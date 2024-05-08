import { PropsWithChildren } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import bgPattern from "./bg-pattern.svg";

type Props = ClassName;

export const Content = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className={twMerge(
        "z-10 m-auto flex flex-col rounded-xl bg-[center_top] bg-no-repeat shadow-xl",
        className
      )}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="modal"
      style={{
        backgroundColor: "white",
        backgroundImage: `url(${bgPattern})`,
      }}
    >
      {children}
    </motion.div>
  );
};
