import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://stage-api-xsbt.galactica.com/query`,
  documents: "src/shared/graphql/**/*.graphql",
  generates: {
    "src/shared/graphql/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
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
