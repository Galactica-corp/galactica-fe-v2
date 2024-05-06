import { ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";

import { ClassName } from "shared/types";
import { shortAddress } from "shared/web3/utils";

import { Avatar } from "./avatar";

type Props = {
  action?: ReactNode;
  avatarUrl?: string;
} & ClassName;

export const Profile = ({ avatarUrl, action, className }: Props) => {
  const { address } = useAccount();

  return (
    <div className={twMerge("flex items-center gap-x-3", className)}>
      <Avatar avatarUrl={avatarUrl} />
      <div className="mr-11 flex flex-col">
        <h4 className="inline-flex text-sm font-semibold text-pickledBluewood">
          Mike Tyson
        </h4>
        <span className="inline-flex text-sm text-riverBed">
          {shortAddress(address, 9, 8)}
        </span>
      </div>

      <div className="ml-auto">{action}</div>
    </div>
  );
};
