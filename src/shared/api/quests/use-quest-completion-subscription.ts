import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { GraphQLError, print } from "graphql";
import { createClient } from "graphql-ws";

import {
  QuestCompletionDocument,
  QuestCompletionSubscription,
} from "shared/graphql";
import { useEventCallback } from "shared/hooks";
import { useSessionStore } from "shared/stores";

const path = import.meta.env.VITE_QUEST_SERVICE_WS;

const wsOrigin = path.startsWith("/")
  ? `ws://${window.location.host}${path}`
  : path;

type EventHandler = (
  data: QuestCompletionSubscription | null | undefined,
  errors: readonly GraphQLError[] | undefined
) => void;

type Options = {
  onConnect?: () => void;
  onEvent?: EventHandler;
};

export const useQuestCompletionSubscription = (options: Options = {}) => {
  const { onEvent = () => {}, onConnect = () => {} } = options;
  const queryClient = useQueryClient();
  const [sessionId] = useSessionStore();

  const handleEvent = useEventCallback(onEvent);
  const handleConnect = useEventCallback(onConnect);

  useEffect(() => {
    if (!sessionId) return;
    const client = initClient(sessionId);

    client.on("connected", () => {
      console.log("connected");
      handleConnect();
    });

    const subscribe = () => {
      return client.subscribe<QuestCompletionSubscription>(
        { query: print(QuestCompletionDocument) },
        {
          next({ data, errors }) {
            handleEvent(data, errors);
          },
          error(error) {
            console.error(error);
          },
          complete() {
            console.log("ws closed");
          },
        }
      );
    };

    const unsubscribe = subscribe();

    return () => {
      unsubscribe();
      client.dispose();
    };
  }, [sessionId, queryClient, handleEvent, handleConnect]);
};

function initClient(sessionId: string) {
  return createClient({
    url: `${wsOrigin}/api/graphql/query`,
    connectionParams: {
      authorization: sessionId,
    },
  });
}
