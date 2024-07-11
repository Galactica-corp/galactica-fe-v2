import { ClientError, GraphQLClient, Variables, gql } from "graphql-request";
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

export const graphqlRequestFetcher =
  <TData, TVariables extends Variables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
  ) =>
  async () => {
    const document = gql`
      ${query}
    `;

    const authHeader = sessionStore.get()
      ? { Authorization: `Bearer ${sessionStore.get()}` }
      : undefined;

    const result: TData = await client.request(document, variables, {
      "Content-Type": "application/json",
      ...authHeader,
      ...options,
    });
    return result;
  };
