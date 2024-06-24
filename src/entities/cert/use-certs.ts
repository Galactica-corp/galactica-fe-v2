import { useCallback } from "react";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useAccount } from "wagmi";

import { ZkCertListItem, ZkCertStandard } from "shared/snap";
import { useGetZkCertStorageHashesQuery } from "shared/snap/rq";

type CertsStore = Record<ZkCertStandard, ZkCertListItem[]>;

type Cert = {
  expirationDateMS: number;
  standard: ZkCertStandard;
} & ZkCertListItem;

export const useCerts = () => {
  const { chainId } = useAccount();

  const [hashes, setHashes] = useLocalStorage<
    Partial<Record<ZkCertStandard, string>>
  >(`store-hashes-${chainId}`, { gip1: "", gip2: "" });

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

  const updateCertsStore = useCallback(
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

  const entries = query.isSuccess ? Object.entries(query.data) : undefined;
  const hasUpdates = Boolean(
    entries?.some(([key, value]) => {
      const storedHash = hashes[key as ZkCertStandard];
      return value !== storedHash;
    }) ||
      (entries?.length === 0 && hashes)
  );

  return {
    certs: certsStore,
    updateCertsStore,
    setCertsStore,
    hasUpdates,
  } as const;
};
