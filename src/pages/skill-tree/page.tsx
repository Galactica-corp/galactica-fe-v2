import { lazy } from "react";

const Page = lazy(() =>
  import("./ui/skill-tree-page").then((module) => ({
    default: module.SkillTreePage,
  }))
);

export const SkillTreePage = () => {
  return <Page />;
};
