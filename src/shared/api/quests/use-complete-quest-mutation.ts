import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CompleteNonVerifiableQuestParams } from "shared/graphql";
import { sdk } from "shared/providers/graphql-client";
import { catchError } from "shared/ui/toast";

import { questsQueries } from "./queries";

const mutationKey = ["quests-service"] as const;

export const useCompleteQuestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey,
    mutationFn: async (params: CompleteNonVerifiableQuestParams) => {
      const response = await sdk.CompleteNonVerifiableQuest({ params });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      return response;
    },
    onError: (error) => {
      if (error.message.includes("not found")) return;
      catchError(error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: questsQueries.allSections(),
      });
    },
  });
};

useCompleteQuestMutation.mutationKey = mutationKey;
