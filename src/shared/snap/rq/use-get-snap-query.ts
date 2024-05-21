import { queryOptions, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { useAccount } from "wagmi";

import { QueryOptions } from "shared/types";

import { WalletGetSnaps } from "../types/rpc-schema";
import { useSnapClient } from "../wagmi";
import { getKey } from "./get-key";

type Params = { id: string; version: string };
type QueryFnData = WalletGetSnaps["ReturnType"][string];

const useGetSnapQueryOptions = <TData = QueryFnData | null>(
  params: Params,
  options?: QueryOptions<
    QueryFnData | null,
    Error,
    TData,
    ReturnType<typeof getKey<"wallet_getSnaps", Params>>
  >
) => {
  const { isConnected } = useAccount();
  const { client } = useSnapClient();

  return queryOptions({
    queryKey: getKey("wallet_getSnaps", params),
    queryFn: async () => {
      invariant(client, "Connect your MetaMask wallet to get snap");

      const snaps = await client.request({
        method: "wallet_getSnaps",
      });

      if (!snaps) return null;

      const foundSnap = Object.values(snaps).find(
        (snap) => snap.id === params.id && snap.version === params.version
      );
      return foundSnap ?? null;
    },
    enabled: Boolean(isConnected && client),
    staleTime: Infinity,
    ...options,
  });
};

export const useGetSnapQuery = (
  params: Params = {
    id: import.meta.env.VITE_SNAP_ID,
    version: import.meta.env.VITE_SNAP_VERSION,
  }
) => {
  const queryOptions = useGetSnapQueryOptions(params);
  return useQuery(queryOptions);
};
