import {
  EncryptedZkCert,
  GenZkProofParams,
  HolderCommitmentData,
  ZkCertListItem,
  ZkCertProof,
  ZkCertSelectionParams,
  ZkCertStandard,
  ZkKYCProofInput,
} from "./types";

export type WalletInvokeSnapRpcSchema = [
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: { method: "clearStorage"; params?: void };
      snapId: string;
    };
    ReturnType: { message: "zkCert storage cleared" };
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: { method: "deleteZkCert"; params: ZkCertSelectionParams };
      snapId: string;
    };
    ReturnType: { message: "Deleted zkCert." };
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: { method: "listZkCerts"; params: ZkCertSelectionParams };
      snapId: string;
    };
    ReturnType: Record<ZkCertStandard, ZkCertListItem[]>;
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: { method: "exportZkCert"; params: ZkCertSelectionParams };
      snapId: string;
    };
    ReturnType: EncryptedZkCert;
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: {
        method: "importZkCert";
        params: {
          encryptedZkCert: EncryptedZkCert;
          // Should the snap return the list of zkCerts after import (to have 1 less confirmation)
          listZkCerts?: boolean;
        };
      };
      snapId: string;
    };
    ReturnType:
      | { message: "zkCert added to storage" }
      | Record<ZkCertStandard, ZkCertListItem[]>;
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: { method: "getHolderCommitment"; params?: void };
      snapId: string;
    };
    ReturnType: HolderCommitmentData;
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: { method: "getZkCertStorageHashes"; params?: void };
      snapId: string;
    };
    ReturnType: Partial<Record<ZkCertStandard, string>>;
  },
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: {
        method: "genZkCertProof";
        params: GenZkProofParams<ZkKYCProofInput>;
      };
      snapId: string;
    };
    ReturnType: ZkCertProof;
  },
];

export type WalletRequestSnaps = {
  Method: "wallet_requestSnaps";
  Parameters: Record<string, { version: string }>;
  ReturnType: Record<
    string,
    {
      blocked: boolean;
      enabled: boolean;
      id: string;
      version: string;
    }
  >;
};

export type WalletGetSnaps = {
  Method: "wallet_getSnaps";
  Parameters?: never;
  ReturnType: Record<
    string,
    {
      blocked: boolean;
      enabled: boolean;
      id: string;
      // TODO: type initial permissions
      initialPermissions: Record<string, unknown>;
      version: string;
    }
  >;
};

export type SnapRpcSchema = [
  WalletRequestSnaps,
  WalletGetSnaps,
  ...WalletInvokeSnapRpcSchema,
];

export type WalletMethod = SnapRpcSchema[number]["Method"];

export type WalletInvokeSnapMethod =
  WalletInvokeSnapRpcSchema[number]["Parameters"]["request"]["method"];
