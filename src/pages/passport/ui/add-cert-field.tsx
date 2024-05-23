import { twMerge } from "tailwind-merge";

import { Icon } from "shared/ui/icon";

type AddCertProps = {
  className?: string;
  disabled?: boolean;
  reward?: string;
  title: string;
};

export const AddCertField = ({
  className,
  title,
  disabled,
  reward,
}: AddCertProps) => {
  return (
    <div
      className={twMerge(
        "relative rounded-lg border border-softPeach bg-softPeach px-3 py-4",
        disabled && "no-data-gradient",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative size-[40px] shrink-0 rounded-lg border border-black/6 bg-porcelain">
            <Icon
              className="place-center size-4 rotate-90 text-mistBlue"
              name="plus"
            />
          </div>
          <div
            className={twMerge("text-riverBed", disabled && "text-santaGrey")}
          >
            <div className="text-base font-medium leading-6">{title}</div>
            <div className="text-xs leading-4">zkCertificate</div>
          </div>
        </div>
        {reward && !disabled ? (
          <div className="relative h-[30px] w-[65px] rounded-lg bg-white">
            <div className="place-center absolute flex items-center">
              <span className="orange-gradient-text font-semibold">{`+${reward}`}</span>
              <Icon className="size-3" name="lightning" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
