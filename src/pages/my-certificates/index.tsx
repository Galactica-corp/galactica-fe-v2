import { lazy } from "react";

export const MyCertificatesPage = lazy(() =>
  import("./my-certificates").then((module) => ({
    default: module.MyCertificates,
  }))
);
