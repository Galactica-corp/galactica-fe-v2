import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";
import { useAccountEffect } from "wagmi";

import { QuestToast } from "entities/quest";
import {
  useCompleteQuestMutation,
  useQuestCompletionSubscription,
} from "shared/api";
import { questsQueries } from "shared/api/quests/queries";
import { useSessionStore, useSyncSession } from "shared/stores";
import { CloseButton } from "shared/ui/toast";

export const Root = () => {
  const queryClient = useQueryClient();
  useSyncSession();
  const { mutate } = useCompleteQuestMutation();

  const [_, setSessionId] = useSessionStore();

  useAccountEffect({
    onDisconnect: () => {
      setSessionId(undefined);
    },
  });

  useQuestCompletionSubscription({
    onConnect: () => {
      mutate({
        quest: "join",
        section: "1-onboarding",
      });
    },
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

        queryClient.invalidateQueries({
          queryKey: questsQueries.allSections(),
        });
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
