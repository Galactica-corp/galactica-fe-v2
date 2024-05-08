import { Suspense, lazy } from "react";

import { Skeleton } from "./skeleton";

const Page = lazy(() =>
  import("./kyc-guardians").then((module) => ({ default: module.KycGuardians }))
);

export const KycGuardiansPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Page />
    </Suspense>
  );
};
