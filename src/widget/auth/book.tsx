import { useState } from "react";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onComplete?(): void;
};

export const Book = ({ children, onComplete }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const duration = 1.5;

  const onStart = () => {
    document.body.classList.add("no-scrollbar");
  };
  const onEnd = () => {
    document.body.classList.remove("no-scrollbar");
    onComplete;
  };

  return (
    <div className="relative w-full" onClick={() => setIsFlipped(true)}>
      <motion.div
        animate={{
          translateX: isFlipped ? "50%" : 0,
        }}
        className="relative m-auto h-[665px] w-[480px] rounded-xl shadow-2xl"
        onAnimationComplete={onEnd}
        onAnimationStart={onStart}
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
        transition={{ translateX: { duration } }}
      >
        <motion.div
          animate={{
            rotateY: isFlipped ? -180 : 0,
            transition: { rotateY: { duration } },
          }}
          className="absolute left-0 top-0 size-full rounded-xl shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            transformOrigin: "left",
            transformStyle: "preserve-3d",
            zIndex: 2,
          }}
        >
          {children}
          <img
            className="absolute left-0 top-0 size-full rounded-xl object-cover"
            src="/passport/back.png"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>
        <div className="absolute left-0 top-0 size-full">
          <img
            className="absolute left-0 top-0 size-full object-cover"
            src={"/passport/page.png"}
          />
        </div>
      </motion.div>
    </div>
  );
};
