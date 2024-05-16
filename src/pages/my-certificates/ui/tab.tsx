import { twMerge } from "tailwind-merge";

type TabProps = {
  active?: boolean;
  children: React.ReactNode;
  indicator?: number;
  onClick?(): void;
};

export const Tab = ({ active, children, onClick, indicator }: TabProps) => {
  const hasIndicator = Boolean(indicator);
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className="px-1 pb-3">
        <div
          className={twMerge(
            "relative text-sm leading-none text-mistBlue",
            active && "orange-gradient-text",
            hasIndicator && "pr-[28px]"
          )}
        >
          {children}
          {hasIndicator ? (
            <div className="absolute right-0 top-1/2 size-[22px] -translate-y-1/2 rounded-full border border-mistyRose bg-bianca">
              <span className="orange-gradient-text place-center text-xs ">
                {indicator}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div
        className={twMerge(
          "orange-gradient-bg absolute -bottom-px hidden h-[2px] w-full",
          active && "block"
        )}
      />
    </div>
  );
};
