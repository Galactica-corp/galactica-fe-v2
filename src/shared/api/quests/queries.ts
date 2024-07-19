import { queryOptions } from "@tanstack/react-query";

import { sdk } from "shared/providers/graphql-client";

export const questsQueries = {
  all: ["quests"] as const,
  sections: () =>
    queryOptions({
      queryKey: [...questsQueries.all, "sections"],
      queryFn: async () => {
        const response = await sdk.Sections();
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
    }),
};
