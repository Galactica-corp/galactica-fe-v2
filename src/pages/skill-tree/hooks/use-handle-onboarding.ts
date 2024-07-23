import { useNavigate } from "react-router-dom";

import { useCerts } from "entities/cert";
import { useCompleteQuestMutation } from "shared/api";
import { Quest } from "shared/graphql";
import { useInstallSnapMutation } from "shared/snap/rq";
import { catchError } from "shared/ui/toast";

const section = "1-onboarding";

export const useHandleOnboarding = () => {
  const { certs, hasUpdates } = useCerts();
  const mutation = useCompleteQuestMutation();
  const installSnapMutation = useInstallSnapMutation();
  const navigate = useNavigate();

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

      if (quest.id === "pass-kyc" && !hasUpdates) {
        if (certs.find((c) => c.standard === "gip1")) {
          await mutation.mutateAsync({
            quest: quest.id,
            section,
          });
        } else {
          navigate("/kyc-guardians");
        }
      }
    } catch (error) {
      catchError(error);
    }
  };
};
