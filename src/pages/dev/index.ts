import { lazy } from "react";

export const DevPage = lazy(() =>
  import("./dev").then((module) => ({
    default: module.Dev,
  }))
);
