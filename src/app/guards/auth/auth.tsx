import { Outlet } from "react-router-dom";

import { useSessionStorage } from "@uidotdev/usehooks";
import { useAccount } from "wagmi";
import { AuthLevel, Auth as AuthWidget } from "widget/auth";

import { useGetSnapQuery } from "shared/snap/rq";
import { Spinner } from "shared/ui/spinner";

type Props = {
  level: AuthLevel;
};

export const Auth = ({ level }: Props) => {
  const { isConnected } = useAccount();
  const { data, isPending } = useGetSnapQuery();
  const [holdAnimation, setHoldAnimation] = useSessionStorage(
    "hold-passport-animation",
    !isConnected
  );

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

  if (level === "metamask" && isConnected && !holdAnimation) return <Outlet />;
  if (level === "snap" && isConnected && data && !holdAnimation)
    return <Outlet />;

  return (
    <div className="flex grow items-center py-9">
      <AuthWidget className="m-auto" level={level} onComplete={onComplete} />
    </div>
  );
};
