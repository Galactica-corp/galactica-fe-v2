import { Outlet } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { Sidebar } from "./sidebar/sidebar";

export const Layout = () => {
  return (
    <div
      className={twMerge("grid grow grid-cols-[auto,1fr] grid-areas-layout")}
    >
      <Sidebar />
      <main className="grid-in-main">
        <Outlet />
      </main>
    </div>
  );
};
