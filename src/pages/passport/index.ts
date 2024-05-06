import { lazy } from "react";

export const PassportPage = lazy(() =>
  import("./passport").then((module) => {
    return { default: module.Passport };
  })
);
