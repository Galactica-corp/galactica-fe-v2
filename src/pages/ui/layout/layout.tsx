import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { useHover } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

import { Spinner } from "shared/ui/spinner";

import { Sidebar } from "./sidebar/sidebar";

type Props = {
  isDrawer?: boolean;
};

export const Layout = ({ isDrawer }: Props) => {
  const [ref, hovering] = useHover();
  const isExpanded = !isDrawer || hovering;

  return (
    <div
      className={twMerge(
        "grid grow grid-cols-[auto,1fr] grid-rows-1 grid-areas-layout"
      )}
    >
      <Sidebar
        drawer={isDrawer}
        drawerRef={ref}
        isExpanded={isExpanded}
        // onToggleExpand={setExpanded}
      />
      <main
        className={twJoin(
          "relative z-0 flex flex-col bg-aquaHaze grid-in-main",
          isDrawer && "pl-20"
        )}
      >
        {isDrawer && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 grow bg-black/50"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        )}

        <Suspense
          fallback={
            <div className="flex grow items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
