import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { SectionsQuery } from "shared/graphql";
import { useSessionStore } from "shared/stores";

import { questsQueries } from "./queries";

export const useQuestsPointsQuery = () => {
  const [sessionId] = useSessionStore();
  return useQuery({
    ...questsQueries.sections(sessionId),
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
  const [sessionId] = useSessionStore();
  return useSuspenseQuery({
    ...questsQueries.sections(sessionId),
    select: (data) => data.sections,
  });
};
