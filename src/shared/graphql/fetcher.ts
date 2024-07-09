import { GraphQLClient, Variables, gql } from "graphql-request";

const client = new GraphQLClient(
  `${import.meta.env.VITE_QUEST_SERVICE}/query`,
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
