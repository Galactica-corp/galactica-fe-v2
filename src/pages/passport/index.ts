import { lazy } from "react";

export const PassportPage = lazy(() =>
  import("./ui/passport").then((module) => {
    return { default: module.Passport };
  })
);
