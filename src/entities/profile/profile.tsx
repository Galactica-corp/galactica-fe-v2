import { ReactNode } from "react";

import { useAccount } from "wagmi";

import { shortAddress } from "shared/web3/utils";

import { Avatar } from "./avatar";

type Props = {
  action?: ReactNode;
  avatarUrl?: string;
};

export const Profile = ({ avatarUrl, action }: Props) => {
  const { address } = useAccount();

  return (
    <div className="flex items-center gap-x-3">
      <Avatar avatarUrl={avatarUrl} />
      <div className="flex flex-col">
        <h4 className="inline-flex text-sm font-semibold text-oxfordBlue">
          Mike Tyson
        </h4>
        <span className="inline-flex text-sm text-fiord">
          {shortAddress(address, 9, 8)}
        </span>
      </div>

      <div className="ml-11">{action}</div>
    </div>
  );
};
