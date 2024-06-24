import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { Spinner } from "shared/ui/spinner";

import { Sidebar } from "./sidebar/sidebar";

export const Layout = () => {
  return (
    <div
      className={twMerge(
        "grid grow grid-cols-[auto,1fr] grid-rows-1 grid-areas-layout"
      )}
    >
      <Sidebar />
      <main className="flex flex-col bg-aquaHaze grid-in-main">
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
