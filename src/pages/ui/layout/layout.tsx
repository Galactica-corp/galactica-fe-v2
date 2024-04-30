import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { Sidebar } from "./sidebar/sidebar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={twMerge("grid grow grid-areas-layout")}>
      <Sidebar />
      <main className="grid-in-main">{children}</main>
    </div>
  );
};
