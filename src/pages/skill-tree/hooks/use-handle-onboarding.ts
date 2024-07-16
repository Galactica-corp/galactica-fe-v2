import { useQueryClient } from "@tanstack/react-query";

import { useCerts } from "entities/cert";
import {
  useCompleteNonVerifiableQuestMutation,
  useSectionsQuery,
} from "shared/graphql";
import { useInstallSnapMutation } from "shared/snap/rq";
import { catchError } from "shared/ui/toast";

import { Quest } from "../types";

const section = "onboarding";

export const useHandleOnboarding = () => {
  const queryClient = useQueryClient();
  const mutation = useCompleteNonVerifiableQuestMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: useSectionsQuery.getKey(),
      });
    },
  });
  const installSnapMutation = useInstallSnapMutation();
  const { certs } = useCerts();

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
        await installSnapMutation.mutateAsync({
          id: import.meta.env.VITE_SNAP_ID,
          version: import.meta.env.VITE_SNAP_VERSION,
        });
        await mutation.mutateAsync({
          params: {
            quest: quest.id,
            section,
          },
        });
      }

      if (quest.id === "pass-kyc" && certs.length > 0) {
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
