import { lazy } from "react";

export const DataGuardiansPage = lazy(() =>
  import("./data-guardians").then((module) => ({
    default: module.DataGuardians,
  }))
);
