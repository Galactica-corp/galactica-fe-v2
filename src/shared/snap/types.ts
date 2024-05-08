export type Method =
  | "clearStorage"
  | "deleteZkCert"
  | "exportZkCert"
  | "genZkKycProof"
  | "getHolderCommitment"
  | "getZkCertHashes"
  | "getZkCertStorageHashes"
  | "importZkCert"
  | "listZkCerts"
  | "updateMerkleProof"
  | "updateMerkleProofURL";

export interface WalletInvokeSnap<Return = unknown, RequestParams = void> {
  Method: "wallet_invokeSnap";
  Parameters: {
    request: { method: Method; params?: RequestParams };
    snapId: string;
  };
  ReturnType: Return;
}

export interface WalletRequestSnaps {
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
}

export interface WalletGetSnaps {
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
}

export type SnapRpcSchema = [
  WalletRequestSnaps,
  WalletGetSnaps,
  WalletInvokeSnap,
];

export type WalletMethod = SnapRpcSchema[number]["Method"];
