import { twMerge } from "tailwind-merge";

import { ClassName } from "shared/types";

import { TrophyCategory } from "../types";

type Props = {
  category: TrophyCategory;
  img: string;
  text: string;
} & ClassName;

export const TrophyCard = (props: Props) => {
  const { className, img, text } = props;
  return (
    <div
      className={twMerge(
        "flex max-w-[330px] gap-x-5 rounded-lg bg-white p-5 pr-[30px]",
        className
      )}
    >
      <img alt="trophy" className="size-[90px]" src={img} />
      <p className="text-riverBed">{text}</p>
    </div>
  );
};
