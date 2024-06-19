import { queryOptions, useQuery } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Account, Address, Chain, Client, HttpTransport } from "viem";
import { useAccount } from "wagmi";

import { SnapRpcSchema } from "../types/rpc-schema";
import { GetInvokeSnapResponse } from "../types/utils";
import { useSnapClient } from "../wagmi";
import { getKey } from "./get-key";
type Params = {
  address: Address | undefined;
  chainId: number | undefined;
  client: Client<HttpTransport, Chain, Account, SnapRpcSchema> | undefined;
};

type Options = {
  onFetch?: (data: GetInvokeSnapResponse<"getZkCertStorageHashes">) => void;
};

export const getOptions = (
  { chainId, address, client }: Params,
  options?: Options
) =>
  queryOptions({
    queryKey: getKey("wallet_invokeSnap", "getZkCertStorageHashes", {
      chainId,
      address,
    }),
    refetchInterval: 10000,
    staleTime: 0,
    queryFn: async () => {
      invariant(client, "client is undefined");
      const response: GetInvokeSnapResponse<"getZkCertStorageHashes"> =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await client.request<any>({
          method: "wallet_invokeSnap",
          params: {
            snapId: import.meta.env.VITE_SNAP_ID,
            request: {
              method: "getZkCertStorageHashes",
            },
          },
        });

      options?.onFetch?.(response);

      return response ?? null;
    },
    enabled: Boolean(client),
  });

export const useGetZkCertStorageHashesQuery = (options: Options = {}) => {
  const { client } = useSnapClient();
  const { chainId, address } = useAccount();
  const { onFetch } = options;

  return useQuery(getOptions({ chainId, address, client }, { onFetch }));
};
