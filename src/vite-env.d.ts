interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_EXPLORER_URL: string;
  readonly VITE_FOLLOW_URL: string;
  readonly VITE_GRAPHQL_SERVER: string;
  readonly VITE_RETWEET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
