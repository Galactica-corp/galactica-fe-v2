import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address, hexToBytes } from "viem";
import { useAccount, useChainId, useWalletClient } from "wagmi";

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

export const useAuthMutation = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: wc } = useWalletClient({ chainId });

  return useMutation({
    mutationFn: async () => {
      invariant(address, "address is undefined");

      const params: ChallengeRequest = {
        user: address,
      };
      const challengeResponse = await fetch(
        `${import.meta.env.VITE_QUEST_SERVICE}/api/challenge`,
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
        `${import.meta.env.VITE_QUEST_SERVICE}/api/sign-in`,
        {
          method: "POST",
          body: JSON.stringify(signInParams),
        }
      );

      return signInResponse.ok;
    },
  });
};
