import { useCallback, useState } from "react";

import { motion, useAnimate } from "framer-motion";
import { useAccount, useAccountEffect } from "wagmi";

type Props = {
  children: React.ReactNode;
  onComplete?(): void;
};

export const Book = ({ children, onComplete }: Props) => {
  const duration = 2;
  const { isConnected } = useAccount();

  const onStart = useCallback(() => {
    // может, придется добавить глобальный класс для body, пока неизвестно
    document.body.classList.add("no-scrollbar");
  }, []);

  const onEnd = useCallback(() => {
    document.body.classList.remove("no-scrollbar");
    onComplete?.();
  }, [onComplete]);

  const [zIndex, setZIndex] = useState(2);
  const [scope, animate] = useAnimate();

  const run = useCallback(() => {
    animate(
      scope.current,
      { translateX: "50%" },
      {
        duration: 2,
        onComplete: onEnd,
        onPlay: onStart,
        onUpdate: (x) => {
          if (x > 10) setZIndex(0);
        },
      }
    );
  }, [onEnd, onStart, animate, scope]);

  useAccountEffect({
    onConnect() {
      run();
    },
  });

  return (
    <div className="relative w-full">
      <motion.div
        className="relative m-auto h-[665px] w-[480px] rounded-xl shadow-2xl"
        initial={false}
        onAnimationComplete={onEnd}
        onAnimationStart={onStart}
        ref={scope}
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
        transition={{
          translateX: { duration: 2 },
        }}
      >
        <motion.div
          animate={{
            rotateY: isConnected ? -180 : 0,
            transition: { rotateY: { duration } },
          }}
          className="absolute left-0 top-0 size-full rounded-xl"
          initial={false}
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            transformOrigin: "left",
            transformStyle: "preserve-3d",
            zIndex,
          }}
        >
          {children}
          <img
            className="absolute left-0 top-0 size-full rounded-xl object-cover shadow-2xl"
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
