import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";

import { Method, WalletInvokeSnap } from "../types";
import { useSnapClient } from "../wagmi";

export const useInvokeSnapMutation = <TReturn = unknown, Params = void>(
  method: Method,
  options?: UseMutationOptions<TReturn, Error, Params>
) => {
  const { client } = useSnapClient();

  return useMutation({
    mutationFn: async (params?: Params) => {
      invariant(client);
      return await client.request<WalletInvokeSnap<TReturn, Params>>({
        method: "wallet_invokeSnap",
        params: {
          snapId: import.meta.env.VITE_SNAP_ID,
          request: {
            method,
            params,
          },
        },
      });
    },
    ...options,
  });
};
