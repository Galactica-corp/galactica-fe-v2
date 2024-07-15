import { createClient, http } from "viem";
import { createConfig } from "wagmi";

import { supportedChains } from "shared/config";

export const config = createConfig({
  chains: supportedChains,
  client: ({ chain }) => {
    return createClient({
      batch: {
        multicall: {
          batchSize: 1024 * 3, // 3kb
        },
      },
      chain,
      transport: http(chain.rpcUrls.default.http[0]),
    });
  },
});

export type Config = typeof config;

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
