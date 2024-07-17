interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_EXPLORER_URL: string;
  readonly VITE_FOLLOW_URL: string;
  readonly VITE_PROOF_FILE: string;
  readonly VITE_QUEST_SERVICE: string;
  readonly VITE_QUEST_SERVICE_WS: string;

  readonly VITE_RETWEET_URL: string;
  readonly VITE_SNAP_ID: string;
  readonly VITE_SNAP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
