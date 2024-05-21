import { useMutation, useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";

import { MutationOptions } from "shared/types";

import { WalletRequestSnaps } from "../types/rpc-schema";
import { useSnapClient } from "../wagmi";

export type InstallSnapParams = {
  id?: string;
  version?: string;
};

type Data = WalletRequestSnaps["ReturnType"];

export const useInstallSnapMutation = <TContext = unknown>(
  options?: MutationOptions<Data, unknown, InstallSnapParams, TContext>
) => {
  const queryClient = useQueryClient();

  const { client } = useSnapClient();

  return useMutation({
    mutationFn: async ({
      id = import.meta.env.VITE_SNAP_ID,
      version = import.meta.env.VITE_SNAP_VERSION,
    }: InstallSnapParams) => {
      invariant(client, "Connect your MetaMask wallet to request the snap");

      return await client.request({
        method: "wallet_requestSnaps",
        params: {
          [id]: {
            version,
          },
        },
      });
    },
    onSuccess: (snaps) => {
      invariant(snaps, "The snap not found");

      queryClient.refetchQueries({ queryKey: ["snap"] });
    },
    onError: (error) => {
      console.error({ error });
    },
    ...options,
  });
};
