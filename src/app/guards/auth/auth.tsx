import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useAccount } from "wagmi";
import { Auth as AuthWidget } from "widget/auth";

import { useGetSnapQuery } from "shared/snap/rq";
import { Spinner } from "shared/ui/spinner";

export const Auth = () => {
  const { isConnected } = useAccount();
  const { data, isPending } = useGetSnapQuery();
  const [holdAnimation, setHoldAnimation] = useState(!isConnected || !data);

  const onComplete = () => {
    setHoldAnimation(false);
  };

  if (isPending && isConnected && !holdAnimation) {
    return (
      <div className="flex grow items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isConnected && data && !holdAnimation) return <Outlet />;

  return (
    <div className="flex grow items-center py-9">
      <AuthWidget className="m-auto" onComplete={onComplete} />
    </div>
  );
};
