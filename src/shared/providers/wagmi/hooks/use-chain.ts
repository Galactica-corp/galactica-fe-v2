import { useAccount, useChains } from "wagmi";

export const useChain = () => {
  const { chain } = useAccount();
  const chains = useChains();

  return chain ?? chains[0];
};
