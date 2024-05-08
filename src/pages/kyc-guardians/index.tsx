import { Suspense, lazy } from "react";

import { Skeleton } from "./skeleton";

const Page = lazy(() =>
  import("./kyc-guardians").then((module) => ({ default: module.KYCGuardians }))
);

export const KYCGuardiansPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Page />
    </Suspense>
  );
};
