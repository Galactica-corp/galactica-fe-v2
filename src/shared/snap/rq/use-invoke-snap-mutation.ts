import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";

import { WalletInvokeSnapMethod } from "../types/rpc-schema";
import { GetInvokeSnapParams, GetInvokeSnapResponse } from "../types/utils";
import { useSnapClient } from "../wagmi";

export const useInvokeSnapMutation = <
  RequestMethod extends WalletInvokeSnapMethod,
  TContext = unknown,
>(
  method: RequestMethod,
  options?: UseMutationOptions<
    GetInvokeSnapResponse<RequestMethod>,
    unknown,
    GetInvokeSnapParams<RequestMethod>,
    TContext
  >
) => {
  const { client } = useSnapClient();

  return useMutation({
    mutationFn: async (params) => {
      invariant(client);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await client.request<any>({
        method: "wallet_invokeSnap",
        params: {
          snapId: import.meta.env.VITE_SNAP_ID,
          request: {
            method,
            params,
          },
        },
      });

      return response as GetInvokeSnapResponse<RequestMethod>;
    },
    ...options,
  });
};
