import { useCerts } from "entities/cert/use-certs";
import { Icon } from "shared/ui/icon";

import metamaskSrc from "./metamask.svg";

type Props = {
  onUpdate: () => void;
};

export const UpdateToast = ({ onUpdate }: Props) => {
  const { updateCerts } = useCerts();

  return (
    <div className="relative flex gap-x-5">
      <div className="relative inline-flex size-20 shrink-0">
        <img alt="task" className="size-full" src={metamaskSrc} />
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">
          Please, approve an access request in&nbsp;MetaMask{" "}
          <span className="text-sm font-normal">
            to share the actual state of your KYC&apos;s to the application.
          </span>
        </div>
        <button
          className="mt-1.5 flex items-center text-sm font-semibold text-basketBallOrange transition-colors hover:brightness-105"
          onClick={async () => {
            await updateCerts();
            onUpdate();
          }}
        >
          Update now <Icon className="ml-2 size-3.5" name="reload" />
        </button>
      </div>
    </div>
  );
};
