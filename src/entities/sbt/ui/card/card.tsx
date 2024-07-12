import { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";
import { Icon } from "shared/ui/icon";

import bg from "./bg.png";

type Props = {
  expiryDate: ReactNode;
  name: ReactNode;
} & ClassName;

export const Card = ({ expiryDate, name, className }: Props) => {
  return (
    <div
      className={twMerge(
        "relative flex h-[171px] w-[338px] flex-col rounded-xl bg-cover p-6 shadow-xl inner-border inner-border-black/10",
        className
      )}
      style={{
        backgroundColor: "white",
        backgroundImage: `url(${bg})`,
      }}
    >
      <Icon
        className="absolute left-6 top-5 size-14 rotate-45 text-blackCow/25"
        name="galacticaStamp"
      />

      <div className="relative mt-auto before:absolute before:-left-6 before:top-0 before:h-full before:w-0.5 before:bg-basketBallOrange">
        <p className="text-sm text-riverBed/70">Expiry date: {expiryDate}</p>
        <h4 className="text-xl font-semibold">{name}</h4>
      </div>
    </div>
  );
};
