import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompleteNonVerifiableQuestParams } from "shared/graphql";
import { sdk } from "shared/providers/graphql-client";

import { questsQueries } from "./queries";

const mutationKey = ["quests-service"] as const;

export const useCompleteQuestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey,
    mutationFn: (params: CompleteNonVerifiableQuestParams) => {
      return sdk.CompleteNonVerifiableQuest({ params });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: questsQueries.sections().queryKey,
      });
    },
  });
};

useCompleteQuestMutation.mutationKey = mutationKey;
