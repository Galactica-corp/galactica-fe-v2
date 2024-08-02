import { Chain } from "viem";

import { galacticaAndromeda } from "./networks/galactica-andromeda";
import { galacticaReticulumTestnet } from "./networks/galactica-reticulum";

export const supportedChains = [
  galacticaAndromeda,
  galacticaReticulumTestnet,
].filter(
  (chain) => chain.id === Number.parseInt(import.meta.env.VITE_CHAIN_ID)
) as [Chain, ...Chain[]];

// export const supportedChains: [Chain, ...Chain[]] = [
//   window.location.hostname.includes("stage")
//     ? galacticaAndromeda
//     : galacticaReticulumTestnet,
// ];
