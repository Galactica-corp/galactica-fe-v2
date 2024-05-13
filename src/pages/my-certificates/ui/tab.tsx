import { twMerge } from "tailwind-merge";

type TabProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?(): void;
};

export const Tab = ({ active, children, onClick }: TabProps) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className={"px-1 pb-3"}>
        <div
          className={twMerge(
            "text-sm leading-none text-mistBlue",
            active && "orange-gradient-text"
          )}
        >
          {children}
        </div>
      </div>
      <div
        className={twMerge(
          "orange-gradient-bg absolute -bottom-[1px] hidden h-[2px] w-full",
          active && "block"
        )}
      />
    </div>
  );
};
