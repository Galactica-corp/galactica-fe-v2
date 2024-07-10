import { Account, Chain, Client, HttpTransport } from "viem";
import { useAccount, useChainId, useConnectorClient } from "wagmi";

import { SnapRpcSchema } from "shared/snap";

import { config } from "../../providers/wagmi/config";

export const useSnapClient = () => {
  const { connector } = useAccount();
  const chainId = useChainId();

  const { data: client } = useConnectorClient({
    chainId: chainId,
    config,
    connector: connector,
  });

  return {
    client: client as unknown as
      | Client<HttpTransport, Chain, Account, SnapRpcSchema>
      | undefined,
  };
};
