import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useAccountEffect } from "wagmi";

import { QuestToast } from "entities/quest";
import { useQuestCompletionSubscription } from "shared/api";
import { useSessionStore, useSyncSession } from "shared/stores";
import { CloseButton } from "shared/ui/toast";

export const Root = () => {
  useSyncSession();

  const [_, setSessionId] = useSessionStore();

  useAccountEffect({
    onDisconnect: () => {
      setSessionId(undefined);
    },
  });

  useQuestCompletionSubscription({
    onEvent: (data, errors) => {
      if (errors?.[0].message.includes("unauthorized")) {
        setSessionId(undefined);
      }

      if (data?.questCompletion) {
        const { points, id, title } = data.questCompletion.quest;
        const section = data.questCompletion.section;
        toast(
          <QuestToast
            points={points}
            questId={id}
            questTitle={title}
            sectionId={section.id}
            sectionTitle={section.title}
          />
        );
      }
    },
  });

  return (
    <>
      <Outlet />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position="bottom-right"
      />
    </>
  );
};
