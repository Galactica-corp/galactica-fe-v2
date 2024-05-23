export type ZkCertStandard = "gip1" | "gip2";

export type ZkCertSelectionParams = {
  chainID?: number;
  expirationDate?: number;
  providerAx?: string;
  registryAddress?: string;
  zkCertStandard?: ZkCertStandard;
};

export type ZkCertListItem = {
  expirationDate: number;
  providerPubKey: {
    ax: string;
    ay: string;
  };
  verificationLevel: string;
};

export type EncryptedZkCert = {
  ciphertext: string;
  ephemPublicKey: string;
  holderCommitment: string;
  nonce: string;
  version: string;
};

export type HolderCommitmentData = {
  encryptionPubKey: string;
  holderCommitment: string;
};
