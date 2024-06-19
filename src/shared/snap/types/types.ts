/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type ZkKYCProofInput = {
  currentTime: number;
  dAppAddress: string;
  investigationInstitutionPubKey: [string, string][];
};

export type ProverData = {
  // Prover code in web assembly that will be used to generate the proof in the Snap.
  wasm: any;
  // Corresponding parameters from the zkey file (SNARK trusted setup ceremony). The binary fields are base64 encoded.
  zkeyHeader: any;
  // Array of base64 encoded zkey sections used by snarkjs. The binary fields are base64 encoded.
  zkeySections: any[];
};

export type GenZkProofParams<ProofInputType> = {
  // General description of the ZKP
  description: string;

  // An object, containing public ZKP input for the statements to be shown by the generated proof.
  input: ProofInputType;

  // Prover to generate the ZKP.
  prover: ProverData;

  // Short description of each public input the proof is disclosing
  publicInputDescriptions: string[];

  // Description of disclosures made by the proof
  // This is provided by the front-end. The snap can not verify if the prover matches this description.
  requirements: {
    // EVM address where the zkCertificate is registered.
    registryAddress: string;
    // For the standard of the zkCertificate that should be used for the proof.
    zkCertStandard: ZkCertStandard;
  };
  // String with the account address the user is going to use to submit the proof.
  userAddress: string;

  // Whether the private input for the ZK proof generation requires to set the EdDSA private key (e.g. for fraud investigation)
  zkInputRequiresPrivKey: boolean;
};

export type ZkCertProof = {
  proof: {
    // disable eslint naming convention rule for this because it is the name given by snarkjs
    curve: string;
    /* eslint-disable @typescript-eslint/naming-convention */
    pi_a: [string, string];
    pi_b: [[string, string], [string, string]];
    pi_c: [string, string];
    /* eslint-enable @typescript-eslint/naming-convention */
    protocol: string;
  };
  publicSignals: string[];
};
