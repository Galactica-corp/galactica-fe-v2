import { Suspense, lazy } from "react";

import { sleep } from "shared/utils";

import { Skeleton } from "./skeleton";

const Page = lazy(() =>
  import("./passport").then(async (module) => {
    await sleep(1000);
    return { default: module.Passport };
  })
);

export const PassportPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Page />
    </Suspense>
  );
};
