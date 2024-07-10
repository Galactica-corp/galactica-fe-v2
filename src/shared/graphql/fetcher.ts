import { GraphQLClient, Variables, gql } from "graphql-request";

const url = import.meta.env.VITE_QUEST_SERVICE;

const client = new GraphQLClient(
  url.startsWith("/")
    ? `${window.origin}${url}/api/graphql/query`
    : `${url}/api/graphql/query`,
  {
    requestMiddleware: (request) => {
      request.credentials = "include";
      return request;
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

    const result: TData = await client.request(document, variables, {
      "Content-Type": "application/json",
      ...options,
    });
    return result;
  };
