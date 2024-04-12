import { Chain } from "viem";

export const galacticaAndromeda = {
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://explorer-andromeda.galactica.com/",
    },
  },
  id: 41238,
  name: "Galactica-Andromeda",
  nativeCurrency: {
    decimals: 18,
    name: "Galactica",
    symbol: "GNET",
  },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-http-andromeda.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-andromeda.galactica.com/"],
    },
    public: {
      http: ["https://evm-rpc-http-andromeda.galactica.com/"],
      webSocket: ["wss://evm-rpc-ws-andromeda.galactica.com/"],
    },
  },
  testnet: true,
} as const satisfies Chain;
