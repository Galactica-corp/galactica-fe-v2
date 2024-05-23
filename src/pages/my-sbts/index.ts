import { lazy } from "react";

export const MySBTsPage = lazy(() =>
  import("./my-sbts").then((module) => ({
    default: module.MySBTs,
  }))
);
