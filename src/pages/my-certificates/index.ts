import { lazy } from "react";

export const MyCertificatesPage = lazy(() =>
  import("./ui/my-certificates").then((module) => ({
    default: module.MyCertificates,
  }))
);
