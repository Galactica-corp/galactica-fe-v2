import { KYCCard } from "entities/kyc-card";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

type Props = {
  loading?: boolean;
};

export const UploadKYC = ({ loading }: Props) => {
  const _loading = (
    <div className="skelet-bg relative mt-6 h-[200px] w-full rounded-xl " />
  );

  const _empty = (
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
          <Button className="w-full whitespace-nowrap text-xs">
            Check KYC Guardians
          </Button>
          <Button className="w-full whitespace-nowrap text-xs" theme="white">
            Upload KYC-file
          </Button>
        </div>
      </div>
    </div>
  );

  const uploaded = (
    <div className="relative">
      <div className="w-[480px]">
        <KYCCard name="swissborg" view="big" />
      </div>
      <div className="absolute left-[60px] top-8 z-0 h-[171px] w-[480px] rounded-xl border border-black/3 bg-softPeach">
        <Icon
          className="absolute right-5 top-1/2 size-4 -translate-y-1/2 rotate-90 text-mistBlue"
          name="plus"
        />
      </div>
    </div>
  );

  return loading ? _loading : uploaded;
};
