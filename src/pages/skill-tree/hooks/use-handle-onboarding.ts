import { useCerts } from "entities/cert";
import { useCompleteQuestMutation } from "shared/api";
import { useInstallSnapMutation } from "shared/snap/rq";
import { catchError } from "shared/ui/toast";

import { Quest } from "../types";

const section = "1-onboarding";

export const useHandleOnboarding = () => {
  const { certs } = useCerts();
  const mutation = useCompleteQuestMutation();
  const installSnapMutation = useInstallSnapMutation();

  return async (quest: Quest) => {
    console.log(section, quest);
    try {
      if (quest.id === "join") {
        await mutation.mutateAsync({
          quest: quest.id,
          section,
        });
      }

      if (quest.id === "install-snap") {
        await installSnapMutation.mutateAsync({});
        await mutation.mutateAsync({
          quest: quest.id,
          section,
        });
      }

      if (quest.id === "pass-kyc" && certs.find((c) => c.standard === "gip1")) {
        await mutation.mutateAsync({
          quest: quest.id,
          section,
        });
      }
    } catch (error) {
      catchError(error);
    }
  };
};
