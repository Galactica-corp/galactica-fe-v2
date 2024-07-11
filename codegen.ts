import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://quest-service.galactica.com/api/graphql/query`,
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
        exposeQueryKeys: true,
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
