import { MetaMaskAvatar } from "react-metamask-avatar";

import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

import { ClassName } from "shared/types";

type Props = {
  avatarUrl?: string;
} & ClassName;

export const Avatar = ({ className }: Props) => {
  const { address } = useAccount();

  if (!address) return null;

  return (
    <MetaMaskAvatar
      address={address}
      className={twMerge(
        "flex size-10 shrink-0 rounded-xl bg-softPeach bg-cover bg-no-repeat",
        className
      )}
    />
  );
};
