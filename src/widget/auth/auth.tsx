import { twMerge } from "tailwind-merge";

import { ConnectWalletButton } from "features/connect-wallet";

import { Book } from "./book";
import galacticaNetworkSrc from "./galactica-network.svg";
import swirlSrc from "./swirl.png";

type Props = {
  className?: string;
  onComplete?(): void;
};

export const Auth = ({ className, ...props }: Props) => {
  return (
    // <Book onComplete={props.onComplete}>
    <div
      className="absolute left-0 top-0 size-full rounded-xl bg-whiteSmoke object-cover"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div
        className={twMerge(
          "flex w-[480px] max-w-[480px] flex-col items-center rounded-xl bg-cover bg-no-repeat py-14",
          className
        )}
        style={{
          backgroundImage: `url("/passport/texture-wave.png")`,
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
    </div>
    // </Book>
  );
};
