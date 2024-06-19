import { Address } from "viem";

type Contracts = {
  BasicKYCExampleDApp: Address;
  KYCRecordRegistry: Address;
  VerificationSBT: Address;
};

export const contracts: Record<number | string, Contracts> = {
  "41238": {
    KYCRecordRegistry: "0x454d8a0B2abdc7bAfef7FCbfb6B4c538c6F11C3b",
    VerificationSBT: "0x8eB78221742a837AD71f329b28e9AEd5C2397824",
    BasicKYCExampleDApp: "0x69D473FE859adEb89ec7EA6047f929c64316Ba70",
  },
};
