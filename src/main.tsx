import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { App } from "app/app";

const container = document.getElementById("app");
const root = createRoot(container!);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.GalacticaInfo = {
  chainId: import.meta.env.VITE_CHAIN_ID,
  questServiceUrl: import.meta.env.VITE_QUEST_SERVICE,
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
