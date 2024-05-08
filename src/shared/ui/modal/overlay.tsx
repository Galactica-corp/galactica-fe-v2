import { ComponentProps } from "react";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { useModalContext } from "./context";

export const Overlay = ({
  className,
  onClick,
  ...props
}: ComponentProps<typeof motion.div>) => {
  const { onChange, isOpen, onAnimationEnd } = useModalContext();

  return (
    <motion.div
      animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
      className={twMerge(
        "fixed inset-0 z-0 flex flex-col overflow-y-auto overscroll-contain bg-[#0C111D]/70 p-8 backdrop-blur-sm",
        className
      )}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="overlay"
      onAnimationComplete={onAnimationEnd}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        onChange(false);
        onClick?.(e);
      }}
      {...props}
    />
  );
};
