import { useCompleteQuestMutation } from "shared/api";
import { useInstallSnapMutation } from "shared/snap/rq";
import { catchError } from "shared/ui/toast";

import { Quest } from "../types";

const section = "onboarding";

export const useHandleOnboarding = () => {
  const mutation = useCompleteQuestMutation();
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
