import { useMutation, useQueryClient } from "@tanstack/react-query";
import invariant from "tiny-invariant";
import { PublicClient, getContract } from "viem";
import {
  useAccount,
  useChainId,
  usePublicClient,
  useWalletClient,
} from "wagmi";

import { catchError } from "shared/ui/toast";

import { basicKYCExampleDapp } from "../abi/basic-kyc-example-dapp";
import { contracts } from "../const";
import { ZkCertProof, ZkKYCProofInput } from "../types/types";
import { useInvokeSnapMutation } from "./use-invoke-snap-mutation";

const publicInputDescriptions = [
  "user pubkey Ax",
  "user pubkey Ay",
  "proof valid",
  "verification SBT expiration",
  "merkle root",
  "current time",
  "user address",
  "human id",
  "dapp address",
  "zkKYC guardian pubkey Ax",
  "zkKYC guardian pubkey Ay",
];

type Options = {
  onPublish?: () => void;
};

export const useGenerateSBTMutation = (options: Options = {}) => {
  const queryClient = useQueryClient();
  const chainId = useChainId();
  const pc = usePublicClient({ chainId });
  const { data: wc } = useWalletClient({ chainId });
  const mutation = useInvokeSnapMutation("genZkCertProof");
  const { onPublish } = options;

  const { address } = useAccount();
  return useMutation({
    mutationFn: async () => {
      invariant(pc, "public client is undefined");
      invariant(wc, "wc is undefined");
      invariant(chainId, "chainId is udnefined");
      invariant(address, "address is undefined. Connect your wallet");

      const contractAddresses = contracts[chainId];

      invariant(contractAddresses, "contracts is undefined, wrong network");

      const expectedValidationTimestamp =
        await getExpectedValidationTimestamp(pc);

      const input: ZkKYCProofInput = {
        currentTime: expectedValidationTimestamp,
        dAppAddress: contractAddresses.BasicKYCExampleDApp,
        investigationInstitutionPubKey: [],
      };

      const response = await fetch(import.meta.env.VITE_PROOF_FILE);
      const prover = await response.json();

      const requirements = {
        // TODO: user have to be able to select kyc-cert
        zkCertStandard: "gip1" as const,
        registryAddress: contractAddresses.KYCRecordRegistry.toLowerCase(),
      };

      const { proof, publicSignals } = await mutation.mutateAsync({
        // ZkCertStandard.ZkKYC => true
        // Twitter => false
        zkInputRequiresPrivKey: true,
        userAddress: address.toString(),
        input,
        requirements,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prover: prover as any,
        publicInputDescriptions,
        description:
          "This ZKP discloses that you hold a valid zkKYC. It has no other disclosures.",
      });

      onPublish?.();

      const [a, b, c] = processProof(proof);
      const publicInputs = processPublicSignals(publicSignals);

      const contract = getContract({
        abi: basicKYCExampleDapp,
        address: contractAddresses.BasicKYCExampleDApp,
        client: wc,
      });
      const gas = await contract.estimateGas.registerKYC(
        [a, b, c, publicInputs],
        { account: address }
      );

      const {
        request: { args, ...options },
      } = await contract.simulate.registerKYC([a, b, c, publicInputs], {
        account: address,
        gas,
      });

      const txHash = await contract.write.registerKYC(args, options);

      const receipt = await pc.waitForTransactionReceipt({
        hash: txHash,
      });

      return receipt;
    },
    onError: catchError,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sbts", chainId, address],
      });
    },
  });
};

function processPublicSignals(publicSignals: string[]) {
  const formatedInputs = publicSignals.map((value) => BigInt(value));
  return formatedInputs;
}

function processProof(proof: ZkCertProof["proof"]) {
  const piA = [BigInt(proof.pi_a[0]), BigInt(proof.pi_a[1])] as const;
  const piB = [
    [BigInt(proof.pi_b[0][1]), BigInt(proof.pi_b[0][0])],
    [BigInt(proof.pi_b[1][1]), BigInt(proof.pi_b[1][0])],
  ] as const;

  const piC = [BigInt(proof.pi_c[0]), BigInt(proof.pi_c[1])] as const;
  return [piA, piB, piC] as const;
}

async function getExpectedValidationTimestamp(pc: PublicClient) {
  const latestBlock = await pc.getBlock({ blockTag: "latest" });
  const timestamp = latestBlock.timestamp;

  const estimatedProofCreationDuration = 20n;

  const expectedValidationTimestamp =
    timestamp + estimatedProofCreationDuration;

  return Number(expectedValidationTimestamp);
}
