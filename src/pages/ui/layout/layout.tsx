import { PropsWithChildren } from "react";

import { Sidebar } from "./sidebar/sidebar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grow grid-areas-layout">
      <Sidebar />
      <main className="grid-in-main">{children}</main>
    </div>
  );
};
