import { twMerge } from "tailwind-merge";

import { Button } from "shared/ui/button";
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
                <Field label="My Level" value="1" />
                <Field
                  icon={<Icon className="size-5" name="lightning" />}
                  label="Score"
                  theme="orange"
                  value="95"
                />
                <Field disabled label="Your GNC" value="—" />
                <Field disabled label="GNC Wave" value="—" />
                <Field disabled label="Reputation" value="—" />
                <Field
                  disabled
                  icon={<Icon className="size-5" name="hand" />}
                  label="Voting Power"
                  theme="blue"
                  value="—"
                />
              </div>
            </div>
          </div>
          <div
            className="relative mt-6 h-[200px] w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('p-bg.png')" }}
          >
            <div className="absolute left-1/2 top-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2">
              <div className="text-center text-[16px] font-medium leading-6 text-balticSea">
                Upload your KYC-file to get access to all the benefits of the
                Galactica Network
              </div>
              <div className="mt-3 flex space-x-3">
                <Button className="w-full whitespace-nowrap text-xs">
                  Check KYC Guardians
                </Button>
                <Button
                  className="w-full whitespace-nowrap text-xs"
                  theme="white"
                >
                  Upload KYC-file
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pl-8">
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-4">
              <Icon className="size-16" name="logo" />
              <div className="flex flex-col">
                <div className="text-sm leading-5 text-riverBed">
                  GNET Balance
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-4xl font-semibold leading-[44px] text-balticSea">
                    0
                  </div>
                  <div
                    className="whitespace-nowrap rounded-[6px] border border-magicMint bg-blackSqueeze
                    px-2 py-[2px] text-sm leading-5 text-shamrockGreen shadow-sm"
                  >
                    $0
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[6px] border border-whiteSmoke/30 bg-white px-3 py-8"></div>
            <div className="grid grid-cols-[1fr,1fr,1.5fr] gap-2">
              <div>
                <div className="text-sm leading-5 text-riverBed">
                  GNET Balance
                </div>
                <div className="whitespace-nowrap text-2xl font-semibold leading-8">
                  0
                </div>
              </div>

              <div>
                <div className="text-sm leading-5 text-riverBed">APY</div>
                <div className="whitespace-nowrap text-2xl font-semibold leading-8">
                  32.1%
                </div>
              </div>

              <Button
                className="w-full text-sm font-semibold"
                theme="basketBallOrange-secondary"
              >
                Go to Staking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FieldProps {
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string;
  theme?: "blue" | "default" | "orange";
  value: string;
}

const Field = ({
  value,
  icon,
  label,
  disabled = false,
  theme = "default",
}: FieldProps) => {
  return (
    <div className={twMerge(disabled && "pointer-events-none opacity-35")}>
      <div className="flex items-center space-x-1">
        <div className="whitespace-nowrap text-sm leading-5 text-riverBed">
          {label}
        </div>
        <Icon
          className="size-3 shrink-0 cursor-pointer text-mistBlue/35"
          name="message"
        />
      </div>
      <div className="flex items-center space-x-1">
        <div
          className={twMerge(
            "whitespace-nowrap text-2xl font-semibold leading-8",
            theme === "default" && "text-balticSea",
            theme === "orange" &&
              "bg-gradient-to-r from-sunriseOrange to-fadedOrange bg-clip-text text-transparent",
            theme === "blue" &&
              "bg-gradient-to-b from-skyBlue to-brightBlue bg-clip-text text-transparent"
          )}
        >
          {value}
        </div>
        {icon}
      </div>
    </div>
  );
};
