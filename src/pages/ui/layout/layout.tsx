import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { useLocalStorage } from "@uidotdev/usehooks";
import { twJoin, twMerge } from "tailwind-merge";

import { Spinner } from "shared/ui/spinner";

import { Sidebar } from "./sidebar/sidebar";

export const Layout = () => {
  const [isDrawer] = useLocalStorage("use-drawer", true);

  return (
    <div
      className={twMerge(
        "grid grow grid-cols-[auto,1fr] grid-rows-1 grid-areas-layout"
      )}
    >
      <Sidebar drawer={isDrawer} />
      <main
        className={twJoin(
          "flex flex-col bg-aquaHaze grid-in-main",
          isDrawer && "z-0"
        )}
      >
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
