import { useMutation, useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, hexToBytes } from "viem";
import {
  Connector,
  useAccount,
  useChainId,
  useConfig,
  useWalletClient,
} from "wagmi";
import { getWalletClientQueryOptions } from "wagmi/query";

import { useSectionsQuery } from "shared/graphql";
import { bufferToBase64 } from "shared/utils";

type ChallengeResponse = {
  challenge: string;
};

type ChallengeRequest = {
  user: Address;
};

type SignInRequest = {
  challenge: string;
  signature: string;
};

type AuthMutationParams = {
  connector?: Connector;
};

export const useAuthMutation = () => {
  const { address } = useAccount();
  const config = useConfig();
  const chainId = useChainId();
  let { data: wc } = useWalletClient({ chainId });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ connector }: AuthMutationParams) => {
      invariant(address, "address is undefined");

      if (!wc) {
        const walletClientOptions = getWalletClientQueryOptions(config, {
          connector,
          chainId,
        });
        wc = await queryClient.fetchQuery(walletClientOptions);
      }

      invariant(wc, "wc is undefined");

      const params: ChallengeRequest = {
        user: address,
      };
      const challengeResponse = await fetch(
        `${import.meta.env.VITE_QUEST_SERVICE}/api/auth/challenge`,
        {
          body: JSON.stringify(params),
          method: "POST",
        }
      );

      const { challenge }: ChallengeResponse = await challengeResponse.json();

      const signature = await wc?.signMessage({
        account: address,
        message: challenge,
      });

      invariant(signature, `signature is undefined`);

      const b64Signature = await bufferToBase64(hexToBytes(signature));

      const signInParams: SignInRequest = {
        signature: b64Signature,
        challenge,
      };

      const signInResponse = await fetch(
        `${import.meta.env.VITE_QUEST_SERVICE}/api/auth/sign-in`,
        {
          method: "POST",
          body: JSON.stringify(signInParams),
        }
      );

      return signInResponse.ok;
    },
    onSuccess: () => {
      const key = useSectionsQuery.getKey();
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
