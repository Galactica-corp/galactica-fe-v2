import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/shared/graphql/schema.graphql",
  // schema: [
  //   {
  //     "http://localhost:5173/quest-api/api/graphql/query": {
  //       headers: {
  //         Authorization: "Bearer L3EiuosI7mOLoITehnXXURRRqNX8w35iI1EcS4WxRaM=",
  //       },
  //     },
  //   },
  // ],
  documents: "src/shared/graphql/**/*.graphql",
  generates: {
    "src/shared/graphql/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      // options for typescript-react-query plugin: https://github.com/dotansimha/graphql-code-generator-community/blob/main/packages/plugins/typescript/react-query/src/config.ts
      config: {
        // custom scalars types
        scalars: {
          SectionID: "string",
          QuestID: "string",
          Points: "number",
          Void: "void",
        },
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        addSuspenseQuery: true,
        reactQueryVersion: 5,
        avoidOptionals: true,
        constEnums: true,
        enumsAsTypes: true,

        fetcher: {
          func: "./fetcher.ts#graphqlRequestFetcher",
          fetchParams: {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        },
      },
    },
  },
  hooks: {
    afterOneFileWrite: "prettier --write",
  },
};

export default config;
