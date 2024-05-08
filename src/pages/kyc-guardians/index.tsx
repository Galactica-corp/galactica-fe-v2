import { lazy } from "react";

export const KYCGuardiansPage = lazy(() =>
  import("./kyc-guardians").then((module) => ({ default: module.KYCGuardians }))
);
