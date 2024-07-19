import { ClientError, GraphQLClient } from "graphql-request";

import { getSdk } from "shared/graphql";
import { sessionStore } from "shared/stores";

const url = import.meta.env.VITE_QUEST_SERVICE;

const client = new GraphQLClient(
  url.startsWith("/")
    ? `${window.origin}${url}/api/graphql/query`
    : `${url}/api/graphql/query`,
  {
    credentials: "include",
    responseMiddleware: (response) => {
      if (response instanceof ClientError && response.response.status === 401) {
        sessionStore.set(undefined);
      }
    },
  }
);

export const sdk = getSdk(client, (action) => {
  const sessionId = sessionStore.get();

  return action({
    Authorization: `Bearer ${sessionId}`,
  });
});
