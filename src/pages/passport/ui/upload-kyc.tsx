import { Link } from "react-router-dom";

import { useCerts } from "entities/cert";
import { KYCCard } from "entities/kyc-card";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

export const UploadKYC = () => {
  const { certs } = useCerts();
  const lastCert = certs[certs.length - 1];

  if (!certs.length)
    return (
      <div
        className="relative mt-6 h-[200px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('p-bg.png')" }}
      >
        <div className="place-center w-[70%]">
          <div className="text-center text-[16px] font-medium leading-6 text-balticSea">
            Upload your KYC-file to get access to all the benefits of the
            Galactica Network
          </div>
          <div className="mt-3 flex space-x-3">
            <Button
              as={Link}
              className="w-full whitespace-nowrap text-xs"
              to="/kyc-guardians"
            >
              Check KYC Guardians
            </Button>
            <Button
              as={Link}
              className="w-full whitespace-nowrap text-xs"
              theme="white"
              to="/my-certificates"
            >
              Upload KYC-file
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative">
      <div className="w-[480px]">
        <KYCCard
          expirationDate={lastCert.expirationDateMS}
          name="unknown"
          view="big"
        />
      </div>
      <Link to="/kyc-guardians">
        <div className="absolute left-[60px] top-8 z-0 h-[171px] w-[480px] rounded-xl border border-black/3 bg-softPeach transition-opacity hover:opacity-80">
          <Icon
            className="absolute right-5 top-1/2 size-4 -translate-y-1/2 rotate-90 text-mistBlue"
            name="plus"
          />
        </div>
      </Link>
    </div>
  );
};
