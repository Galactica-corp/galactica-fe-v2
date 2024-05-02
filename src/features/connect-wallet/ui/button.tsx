import { ComponentProps, ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { ClassName } from "shared/types";
import { Button, ButtonProps } from "shared/ui/button";
import { Spinner } from "shared/ui/spinner";
import { shortAddress } from "shared/web3/utils";

type Props = {
  connectContent?: ReactNode;
  switchChainContent?: ReactNode;
} & ButtonProps &
  ClassName;

export function ConnectButton({
  className,
  connectContent = "Connect MetaMask",
  switchChainContent = "Switch chain",
  ...props
}: Props) {
  const {
    address,
    isDisconnected,
    isConnecting,
    chainId: currentChainId,
    connector,
  } = useAccount();
  const chainId = useChainId();

  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const handleConnect = () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    const flaskConnector = connectors.find((connector) => {
      return connector.name === "MetaMask Flask";
    });

    const connector = metamaskConnector ?? flaskConnector;

    connector && connect({ connector });
  };

  const btnProps: ComponentProps<typeof Button> = {
    className: twMerge("w-[18.75rem] space-x-[0.9rem]", className),
    isLoading: isConnecting,
    ...props,
  };

  if (
    !connectors.some(
      (connector) =>
        connector.name === "MetaMask" || connector.name === "MetaMask Flask"
    )
  ) {
    return (
      <Button as="a" href="https://metamask.io/download" {...btnProps}>
        Install Metamask
      </Button>
    );
  }

  if (isDisconnected || isConnecting) {
    return (
      <Button {...btnProps} onClick={handleConnect}>
        {isConnecting ? <Spinner /> : connectContent}
      </Button>
    );
  }

  if (currentChainId !== chainId) {
    return (
      <Button
        {...btnProps}
        onClick={() => switchChain({ connector: connector, chainId })}
      >
        {switchChainContent}
      </Button>
    );
  }

  return (
    <Button {...btnProps} onClick={() => disconnect()}>
      <span className="mr-1.5">{shortAddress(address, 4, 4)}</span>
    </Button>
  );
}
