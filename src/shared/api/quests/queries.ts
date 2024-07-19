import { queryOptions } from "@tanstack/react-query";

import { sdk } from "shared/providers/graphql-client";

export const questsQueries = {
  all: ["quests"] as const,
  allSections: () => [...questsQueries.all, "sections"] as const,
  sections: (sessionId: string | undefined) =>
    queryOptions({
      queryKey: [...questsQueries.allSections(), sessionId],
      queryFn: async () => {
        const response = await sdk.Sections();
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
    }),
};
