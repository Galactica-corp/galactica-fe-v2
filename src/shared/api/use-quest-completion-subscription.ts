import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql";
import { createClient } from "graphql-ws";

import {
  QuestCompletionDocument,
  QuestCompletionSubscription,
} from "shared/graphql";
import { useEventCallback } from "shared/hooks";
import { useSessionStore } from "shared/stores";

const path = import.meta.env.VITE_QUEST_SERVICE_WS;

const wsLink = `ws://${path.startsWith("/") ? `${window.location.host}${path}` : path}/api/graphql/query`;

type Props = {
  onEvent: (
    data: QuestCompletionSubscription | null | undefined,
    errors: readonly GraphQLError[] | undefined
  ) => void;
};

export const useQuestCompletionSubscription = (
  options: Props = { onEvent: () => {} }
) => {
  const queryClient = useQueryClient();
  const [sessionId] = useSessionStore();

  const handleEvent = useEventCallback(options.onEvent);

  useEffect(() => {
    if (!sessionId) return;
    const client = initClient(sessionId);

    const subscribe = () => {
      return client.subscribe<QuestCompletionSubscription>(
        { query: QuestCompletionDocument },
        {
          next({ data, errors }) {
            handleEvent(data, errors);
          },
          error(error) {
            console.error(error);
          },
          complete() {
            console.log("Closed");
          },
        }
      );
    };

    const unsubscribe = subscribe();

    return () => {
      unsubscribe();
      client.dispose();
    };
  }, [sessionId, queryClient, handleEvent]);
};

function initClient(sessionId: string) {
  return createClient({
    url: wsLink,
    connectionParams: {
      authorization: sessionId,
    },
  });
}
