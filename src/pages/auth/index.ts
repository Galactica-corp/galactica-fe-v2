import { lazy } from "react";

export const AuthPage = lazy(() =>
  import("./auth").then((module) => {
    return { default: module.Auth };
  })
);
