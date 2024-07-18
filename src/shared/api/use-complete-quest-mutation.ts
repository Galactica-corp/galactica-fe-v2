import { useQueryClient } from "@tanstack/react-query";

import {
  useCompleteNonVerifiableQuestMutation,
  useSectionsQuery,
} from "shared/graphql";

export const useCompleteQuestMutation = () => {
  const queryClient = useQueryClient();

  return useCompleteNonVerifiableQuestMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0] as string;
          useSectionsQuery.getKey()[0];
          return key.includes("Sections");
        },
      });
    },
  });
};
