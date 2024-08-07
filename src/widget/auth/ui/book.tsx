import { Variant, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { useAuthStatus } from "../use-auth-status";

type Props = {
  children: React.ReactNode;
  isMetamaskNeeded?: boolean;
  isSnapNeeded?: boolean;
  onComplete?(): void;
};

const duration = 1;

const open: Variant = {
  rotateY: -180,
  z: 10,
  transition: { rotateY: { duration } },
};

const close: Variant = {
  rotateY: 0,
  z: 0,
  transition: { rotateY: { duration } },
};

export const Book = ({
  isMetamaskNeeded,
  isSnapNeeded,
  children,
  onComplete,
}: Props) => {
  const { isAuth } = useAuthStatus({
    isMetamaskNeeded,
    isSnapNeeded,
  });

  return (
    <div className="relative w-full">
      <motion.div
        animate={isAuth ? { x: "50%", transition: { duration } } : { x: 0 }}
        className="relative m-auto h-[665px] w-[480px] rounded-xl shadow-2xl"
        initial={false}
        onAnimationComplete={onComplete}
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
        }}
        transition={{
          translateX: { duration: 2 },
        }}
      >
        <img
          className={twMerge(
            "relative size-full object-cover",
            isAuth && "z-10 -translate-x-1"
          )}
          src={"/passport/page.png"}
        />
        <motion.div
          animate={isAuth ? "open" : "close"}
          className="absolute left-0 top-0 size-full rounded-xl"
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "left",
            transformStyle: "preserve-3d",
          }}
          variants={{ open, close }}
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
      </motion.div>
    </div>
  );
};
