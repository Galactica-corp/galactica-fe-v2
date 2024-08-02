import { Link } from "react-router-dom";

import { twMerge } from "tailwind-merge";

import { useCerts } from "entities/cert";
import { SBTCard } from "entities/sbt";
import { useGenerateSBTMutation } from "shared/snap/rq";
import { ClassName } from "shared/types";
import { Button } from "shared/ui/button";
import { catchError } from "shared/ui/toast";

export const SBTBanner = ({ className }: ClassName) => {
  const mutation = useGenerateSBTMutation();
  const { hasUpdates, updateCerts } = useCerts();

  const handleGenerate = async () => {
    if (hasUpdates) {
      await updateCerts();
    }
    mutation.mutate(undefined, {
      onSuccess: () => {},
      onError: catchError,
    });
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
        <h2 className="text-xl font-semibold">Generate your first SBT</h2>
        <p className="mt-2.5 text-sm text-riverBed">
          In order to use your KYC, you need to generate at least a minimal
          zkProof disclosing its existence
        </p>
      </div>

      <div className="ml-auto flex items-start gap-x-2">
        <Button
          as={Link}
          target="_blank"
          theme="pickledBluewood-white"
          to="https://docs.galactica.com/galactica-developer-documentation/galactica-concepts/zero-knowledge-kyc/verification-sbt"
        >
          Learn more
        </Button>
        <Button isLoading={mutation.isPending} onClick={handleGenerate}>
          Generate SBT
        </Button>
      </div>
    </div>
  );
};
