import { toast } from "react-toastify";

import { twMerge } from "tailwind-merge";

import { SBTCard } from "entities/sbt";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";

import { ToastTask } from "./toast";

export const OriginalSBTBanner = ({ className }: ClassName) => {
  const handleLearnMoreClick = () => {
    toast(<ToastTask />);
    console.log("hello world");
  };

  return (
    <div
      className={twMerge(
        "flex gap-x-8 rounded-xl border border-iron p-8",
        className
      )}
    >
      <div className="h-[85px] w-[170px] origin-top-left">
        <SBTCard
          className="origin-top-left scale-50"
          expiryDate="25.03.29"
          name="KYC Proof"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold">Generate original SBT</h2>
        <p className="mt-2.5 text-sm text-riverBed">
          In order to use your KYC, you need to generate at least a minimal
          zkProof disclosing its existence
        </p>
      </div>

      <div className="ml-auto flex items-start gap-x-2">
        <Button onClick={handleLearnMoreClick} theme="pickledBluewood-white">
          Learn more
        </Button>
        <Button>Generate SBT</Button>
      </div>
    </div>
  );
};
