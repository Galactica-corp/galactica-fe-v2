import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, getContract } from "viem";
import { useAccount, useChainId, usePublicClient } from "wagmi";

import { contracts, verificationSBTABI } from "shared/snap";
import { QueryOptions } from "shared/types";

type SBTInfo = { description: string; expirationTime: number; tokenId: bigint };

type Response = SBTInfo | null;

const getQueryOptions = <TData = Response>(
  pc: ReturnType<typeof usePublicClient>,
  chainId: number | string | undefined,
  accountAddress: Address | undefined,
  options?: QueryOptions<Response, unknown, TData>
) =>
  queryOptions({
    queryKey: ["sbts", chainId, accountAddress] as const,
    staleTime: Infinity,
    queryFn: async () => {
      invariant(pc, "pc is undefined");
      invariant(chainId, "chainId is undefined");
      invariant(accountAddress, "accountAddress is undefined");

      const contractAddresses = contracts[chainId];

      const contract = getContract({
        abi: verificationSBTABI,
        address: contractAddresses.VerificationSBT as Address,
        client: pc,
      });

      const sbtInfo = await contract.read.getVerificationSBTInfo(
        [accountAddress, contractAddresses.BasicKYCExampleDApp],
        {
          account: accountAddress,
        }
      );

      if (sbtInfo.dApp !== contractAddresses.BasicKYCExampleDApp) return null;

      const metaLink = await contract.read.tokenURI([sbtInfo.tokenId]);

      const metaResponse = await fetch(metaLink);
      const meta: { description: string } = await metaResponse.json();

      return {
        ...meta,
        expirationTime: Number(sbtInfo.expirationTime) * 1000,
        tokenId: sbtInfo.tokenId,
      } as SBTInfo;
    },
    enabled: Boolean(pc && accountAddress && chainId),
    ...options,
  });

export const useSBTsSuspenseQuery = <TData = Response>(
  options?: QueryOptions<Response, unknown, TData>
) => {
  const pc = usePublicClient();
  const { address } = useAccount();
  const chainId = useChainId();
  return useSuspenseQuery(getQueryOptions(pc, chainId, address, options));
};
