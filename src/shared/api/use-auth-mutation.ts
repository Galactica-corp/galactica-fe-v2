import { useMutation } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { Address } from "viem";
import { useAccount, useWalletClient } from "wagmi";

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

function toBase64(str: string) {
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join("");
  return btoa(binString);
}

export const useAuthMutation = () => {
  const { address } = useAccount();
  const { data: wc } = useWalletClient();

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
        message: { raw: challenge as `0x${string}` },
      });

      invariant(signature, `signature is undefined`);

      const signInParams: SignInRequest = {
        signature: toBase64(signature),
        challenge,
      };

      const signInResponse = await fetch(
        `${import.meta.env.VITE_QUEST_SERVICE}/api/sign-in`,
        {
          method: "POST",
          body: JSON.stringify(signInParams),
        }
      );

      const signInData = await signInResponse.json();

      return signInData;
    },
  });
};
