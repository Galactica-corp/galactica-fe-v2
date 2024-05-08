import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";

export const UploadKYC = () => {
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
      <div
        className="relative z-10 mt-[36px] w-[480px]
        overflow-hidden rounded-xl border border-black/4
        bg-whiteSmoke bg-certCardBg bg-no-repeat shadow-xl"
      >
        <div className="absolute z-0 size-full bg-gradient-to-r from-caribbeanGreen/0 to-caribbeanGreen/6 " />
        <div className="relative z-10 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-between">
              <div className="relative size-[50px] rounded-[10px] border border-caribbeanGreen/10 bg-white">
                <Icon className="place-center size-[33px]" name="certLogo" />
              </div>
            </div>
            <div className="text-riverBed/70">
              <div className="text-xs">Expiry date</div>
              <div className="text-sm">118 days</div>
            </div>
          </div>
          <div className="mt-9 text-balticSea">
            <div className="text-sm font-medium leading-5">Your active KYC</div>
            <div className="text-2xl font-semibold leading-8">
              Swissborg KYC
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[60px] top-8 z-0 h-[171px] w-[480px] rounded-xl border border-black/3 bg-softPeach">
        <Icon
          className="absolute right-5 top-1/2 size-4 -translate-y-1/2 rotate-90 text-mistBlue"
          name="plus"
        />
      </div>
    </div>
  );

  return uploaded;
};
