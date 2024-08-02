import { Chain } from "viem";

export const galacticaReticulumTestnet: Chain = {
  id: 9302,
  name: "Galactica-reticulum",
  nativeCurrency: {
    decimals: 18,
    name: "Galactica",
    symbol: "GNET",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-http-reticulum.galactica.com"],
      webSocket: ["wss://evm-rpc-ws-reticulum.galactica.com"],
    },
    public: {
      http: ["https://evm-rpc-http-reticulum.galactica.com"],
      webSocket: ["wss://evm-rpc-ws-reticulum.galactica.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-reticulum.galactica.com",
    },
  },
  testnet: true,
} as const satisfies Chain;
