import { lazy } from "react";

export const HomePage = lazy(() =>
  import("./home").then((module) => {
    return { default: module.Home };
  })
);
