import { useEffect, useRef } from "react";
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
import { useGetSnapQuery } from "shared/snap/rq";
import { useSessionStore, useSyncSession } from "shared/stores";
import { CloseButton } from "shared/ui/toast";

export const Root = () => {
  useSyncSession();

  const queryClient = useQueryClient();

  const shouldInitRef = useRef(true);

  const { mutate } = useCompleteQuestMutation();
  const snapQuery = useGetSnapQuery();

  const [sessionId, setSessionId] = useSessionStore();

  const { isConnected: isWSConnected } = useQuestCompletionSubscription({
    onConnect: () => {
      shouldInitRef.current = true;
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

  useAccountEffect({
    onDisconnect: () => {
      shouldInitRef.current = false;
      setSessionId(undefined);
    },
  });

  // hack
  useEffect(() => {
    if (
      sessionId &&
      isWSConnected &&
      snapQuery.isSuccess &&
      shouldInitRef.current
    ) {
      mutate({
        quest: "join",
        section: "1-onboarding",
      });

      if (snapQuery.data) {
        mutate({
          quest: "install-snap",
          section: "1-onboarding",
        });
      }

      shouldInitRef.current = false;
    }
  }, [sessionId, isWSConnected, snapQuery.isSuccess, snapQuery.data, mutate]);

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
