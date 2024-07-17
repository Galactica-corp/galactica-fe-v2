import { useQueryClient } from "@tanstack/react-query";

import { useCompleteNonVerifiableQuestMutation } from "shared/graphql";
import { useInstallSnapMutation } from "shared/snap/rq";
import { catchError } from "shared/ui/toast";

import { Quest } from "../types";

const section = "onboarding";

export const useHandleOnboarding = () => {
  const queryClient = useQueryClient();
  const mutation = useCompleteNonVerifiableQuestMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0] as string;
          return key.includes("Sections");
        },
      });
    },
  });
  const installSnapMutation = useInstallSnapMutation();

  return async (quest: Quest) => {
    try {
      if (quest.id === "join") {
        await mutation.mutateAsync({
          params: {
            quest: quest.id,
            section,
          },
        });
      }

      if (quest.id === "install-snap") {
        await installSnapMutation.mutateAsync({});
        await mutation.mutateAsync({
          params: {
            quest: quest.id,
            section,
          },
        });
      }
    } catch (error) {
      catchError(error);
    }
  };
};
