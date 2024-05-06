import { Icon } from "shared/ui/icon";

export const Passport = () => {
  return (
    <div className="mt-[100px] flex items-center justify-center">
      <div
        className={
          "grid w-[1216px] max-w-[1216px] grid-cols-2 rounded-xl border border-black/7 bg-whiteSmoke p-8 shadow-2xl"
        }
      >
        <div className="border-r border-r-dawnPink pr-8">
          <div className="flex space-x-8">
            <div className="no-data-gradient relative h-[323px] w-[269px] rounded-xl border border-softPeach">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-center text-sm leading-5 text-riverBed/30">
                  User without a KYC proof
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <div>
                <div className="mb-1 text-sm leading-5 text-riverBed">
                  Your Cypher Book ID
                </div>
                <div
                  className="flex items-end whitespace-nowrap
                  bg-gradient-to-r from-sunriseOrange to-fadedOrange
                  bg-clip-text font-ptm text-[38px] leading-none tracking-[-2px]
                  text-transparent
                  "
                >
                  <span>#0x8b2</span>
                  <span className="mr-1 text-xl tracking-[-6px]">...</span>
                  <span>86a01</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                <Field />
                <Field />
                <Field />
                <Field />
              </div>
            </div>
          </div>
        </div>

        <div className="pl-8">2</div>
      </div>
    </div>
  );
};

const Field = () => {
  return (
    <div>
      <div className="flex items-center space-x-1">
        <div className="whitespace-nowrap text-sm leading-5 text-riverBed">
          My Level
        </div>
        <Icon
          className="size-3 shrink-0 cursor-pointer text-mistBlue/35"
          name="message"
        />
      </div>
      <div className="text-2xl font-semibold leading-8 text-balticSea">1</div>
    </div>
  );
};
