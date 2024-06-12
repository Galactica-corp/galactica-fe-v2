import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { Spinner } from "shared/ui/spinner";

import { Sidebar } from "./sidebar/sidebar";

export const Layout = () => {
  const location = useLocation();
  return (
    <div
      className={twMerge("grid grow grid-cols-[auto,1fr] grid-areas-layout")}
    >
      <Sidebar />
      <main className="flex flex-col bg-aquaHaze grid-in-main">
        {location.pathname === "/" ? (
          <Outlet />
        ) : (
          <Suspense
            fallback={
              <div className="flex grow items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        )}
      </main>
    </div>
  );
};
