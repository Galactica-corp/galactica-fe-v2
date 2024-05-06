import { Suspense, lazy } from "react";

import { Skeleton } from "./skeleton";

const Page = lazy(() =>
  import("./home").then(async (module) => {
    return { default: module.Home };
  })
);

export const HomePage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Page />
    </Suspense>
  );
};
