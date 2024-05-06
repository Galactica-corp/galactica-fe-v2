import { twMerge } from "tailwind-merge";

import { ConnectWalletButton } from "features/connect-wallet";
import { ClassName } from "shared/types";

import galacticaNetworkSrc from "./galactica-network.svg";
import swirlSrc from "./swirl.png";

export const Auth = ({ className }: ClassName) => {
  return (
    <div
      className={twMerge(
        "flex w-[480px] max-w-[480px] flex-col items-center rounded-xl bg-cover bg-no-repeat py-14 shadow-2xl",
        className
      )}
      style={{
        backgroundImage: `url("/texture-wave.png")`,
      }}
    >
      <h2 className="mb-12 font-ptm text-[40px] uppercase leading-[130%]">
        Passport
      </h2>
      <img alt="swirl" className="h-[283px] w-[290px]" src={swirlSrc} />
      <ConnectWalletButton
        className="mt-10 h-[54px] w-[227px] font-ptm uppercase inner-border-basketBallOrange/75"
        connectContent={
          <span className="tracking-tighter">Login with MetaMask</span>
        }
        theme="basketBallOrange-transparent"
      />
      <img className="mt-8" src={galacticaNetworkSrc} />
    </div>
  );
};
