import { twJoin, twMerge } from "tailwind-merge";

import { Icon, IconName } from "../icon";

export type CertType = "swissborg" | "xCom";

export type Props = {
  className?: string;
  type: CertType;
  view: "big" | "small";
};

export const Certificate = ({ type, view }: Props) => {
  const nameMap: Record<CertType, string> = {
    swissborg: "Swissborg KYC",
    xCom: "X.com KYC",
  };

  const name = nameMap[type];

  const bgMap: Record<CertType, string> = {
    swissborg: "from-transparent to-caribbeanGreen/6",
    xCom: "from-transparent to-azure/8",
  };

  const borderMap: Record<CertType, string> = {
    swissborg: "border-caribbeanGreen/10",
    xCom: "border-azure/10",
  };

  const gradient = bgMap[type];
  const border = borderMap[type];

  const iconNameMap: Record<CertType, IconName> = {
    swissborg: "swissborg",
    xCom: "cross",
  };

  const iconName = iconNameMap[type];

  return (
    <div
      className={twJoin(
        "relative z-10 mt-[36px] w-full overflow-hidden rounded-xl border border-black/4 bg-whiteSmoke ",
        "bg-no-repeat shadow-xl"
      )}
    >
      <div
        className={twMerge(
          "absolute left-0 h-full overflow-hidden",
          view === "big" && "w-4/5",
          view === "small" && "w-full"
        )}
      >
        <div className="place-center absolute size-[200%] -rotate-45">
          {Array(40)
            .fill(name)
            .map((e, i) => (
              <span
                className="mr-4 text-lg font-semibold leading-[30px] text-balticSea/2"
                key={i}
              >
                {e}
              </span>
            ))}
        </div>
      </div>
      <div
        className={twMerge(
          "absolute z-0 size-full bg-gradient-to-r ",
          gradient
        )}
      />
      <div className="relative z-10 px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center justify-between">
            <div
              className={twMerge(
                "relative size-[50px] rounded-[10px] border bg-white",
                border
              )}
            >
              <Icon className="place-center size-[33px]" name={iconName} />
            </div>
          </div>
          <div className="text-riverBed/70">
            <div className="text-xs">Expiry date</div>
            <div className="text-sm">118 days</div>
          </div>
        </div>
        <div className="mt-9 text-balticSea">
          <div className="text-sm font-medium leading-5">Your active KYC</div>
          <div className="text-2xl font-semibold leading-8">{name}</div>
        </div>
      </div>
    </div>
  );
};
