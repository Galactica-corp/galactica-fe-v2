import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import invariant from "tiny-invariant";
import { useAccount, useChainId } from "wagmi";

import { ZkCertListItem, ZkCertStandard } from "shared/snap";
import {
  getZkCertStorageHashesQueryOptions,
  useGetZkCertStorageHashesQuery,
  useInvokeSnapMutation,
} from "shared/snap/rq";
import { useSnapClient } from "shared/snap/wagmi";
import { catchError } from "shared/ui/toast";

type CertsStore = Record<ZkCertStandard, ZkCertListItem[]>;

type Cert = {
  expirationDateMS: number;
  standard: ZkCertStandard;
} & ZkCertListItem;

export const useCerts = () => {
  const { address } = useAccount();
  const chainId = useChainId();
  const { client } = useSnapClient();
  const queryClient = useQueryClient();

  const [hashes, setHashes] = useLocalStorage<
    Partial<Record<ZkCertStandard, string>>
  >(`store-hashes-${chainId}`, {});

  const query = useGetZkCertStorageHashesQuery({
    onFetch: (data) => {
      const entries = Object.entries(data);

      let updates = { ...hashes };
      entries.forEach(([key, hash]) => {
        if (!hashes[key as ZkCertStandard]) {
          updates = { ...updates, [key]: hash };
        }
      });

      setHashes(updates);
    },
  });

  const [certsStore, setCertsStore] = useLocalStorage<Cert[]>(
    `zk-certs-${chainId}`,
    []
  );

  const setCerts = useCallback(
    (newStore: CertsStore, hashes: Partial<Record<ZkCertStandard, string>>) => {
      const newCerts = Object.entries(newStore).reduce<Cert[]>(
        (acc, [standard, items]) => {
          const certs = items.map((item) => {
            return {
              ...item,
              standard,
              expirationDateMS: item.expirationDate * 1000,
            } as Cert;
          });

          acc.push(...certs);
          return acc;
        },
        []
      );
      setHashes(hashes);
      setCertsStore(newCerts);
    },
    [setCertsStore, setHashes]
  );

  const mutation = useInvokeSnapMutation("listZkCerts", {
    onSuccess: async (data) => {
      invariant(address, "address is undefined");
      invariant(client, "client is undefined");

      const queryOptions = getZkCertStorageHashesQueryOptions({
        chainId,
        address,
        client,
      });
      const hashesResponse = await queryClient.fetchQuery(queryOptions);
      queryClient.setQueryData(queryOptions.queryKey, hashesResponse);

      setCerts(data, hashesResponse);
    },
    onError: catchError,
  });

  const entries = query.isSuccess ? Object.values(query.data) : [];
  const lsEntries = Object.values(hashes).filter(Boolean);

  const set = new Set([...entries, ...lsEntries]);

  const hasUpdates = query.isSuccess
    ? set.size > entries.length || entries.length !== lsEntries.length
    : false;

  certsStore.map();
  return {
    certs: certsStore,
    setCerts,
    updateCerts: mutation.mutateAsync,
    hasUpdates,
  } as const;
};
