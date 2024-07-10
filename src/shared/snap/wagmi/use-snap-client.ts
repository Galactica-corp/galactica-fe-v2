import { Account, Chain, Client, HttpTransport } from "viem";
import { useAccount, useConnectorClient } from "wagmi";

import { useChain } from "shared/providers/wagmi";
import { SnapRpcSchema } from "shared/snap";

import { config } from "../../providers/wagmi/config";

export const useSnapClient = () => {
  const chain = useChain();
  const { connector } = useAccount();

  const { data: client } = useConnectorClient({
    chainId: chain.id,
    config,
    connector: connector,
  });

  return {
    client: client as unknown as
      | Client<HttpTransport, Chain, Account, SnapRpcSchema>
      | undefined,
  };
};
