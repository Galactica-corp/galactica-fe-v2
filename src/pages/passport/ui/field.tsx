import { twMerge } from "tailwind-merge";

import { Icon } from "shared/ui/icon";

type FieldProps = {
  disabled?: boolean;
  icon?: React.ReactNode;
  label: string;
  theme?: "blue" | "default" | "orange";
  value: string;
};

export const Field = ({
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
            theme === "orange" && "orange-gradient",
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
