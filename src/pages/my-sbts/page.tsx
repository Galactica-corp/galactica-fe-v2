import { lazy } from "react";

const Page = lazy(() =>
  import("./ui/my-sbts").then((module) => ({
    default: module.MySBTs,
  }))
);

export const MySBTsPage = () => {
  return <Page />;
};
