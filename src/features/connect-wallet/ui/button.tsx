import { ComponentProps, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "shared/ui/button";
import { shortAddress } from "shared/web3/utils";

export const ConnectButton = ({
  children = "Connect MetaMask",
  className,
  ...props
}: PropsWithChildren<ComponentProps<typeof Button>>) => {
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const onClick = () => {
    if (isConnected) {
      disconnect();
    }
    if (isDisconnected) {
      const connector = connectors.find(
        (connector) => connector.name === "MetaMask"
      );
      connector && connect({ connector });
    }
  };

  return (
    <Button
      className={twMerge("py-2.5 text-sm leading-6", className)}
      isLoading={isConnecting}
      onClick={onClick}
      theme="white"
      {...props}
    >
      {(isDisconnected || isConnecting) && children}

      {isConnected && (
        <span className="mr-1.5">{shortAddress(address, 9, 8)}</span>
      )}
    </Button>
  );
};
