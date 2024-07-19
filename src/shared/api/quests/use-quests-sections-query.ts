import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { SectionsQuery } from "shared/graphql";

import { questsQueries } from "./queries";

export const useQuestsPointsQuery = () => {
  return useQuery({
    ...questsQueries.sections(),
    select: (data: SectionsQuery) =>
      data.sections
        .flatMap((s) => s.points)
        .reduce((acc, point) => {
          acc = acc + point;
          return acc;
        }, 0),
  });
};

export const useSuspenseSectionsQuery = () => {
  return useSuspenseQuery({
    ...questsQueries.sections(),
    select: (data) => data.sections,
  });
};
