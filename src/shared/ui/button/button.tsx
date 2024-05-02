import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

import { Spinner } from "../spinner";

export type Theme = "jaffa" | "jaffa-transparent" | "oxfordBlue" | "white";

export type Props = {
  disabled?: boolean;
  isLoading?: boolean;
  theme?: Theme;
} & ClassName;

export const Button = <E extends ElementType = "button">(
  props: PropsWithChildren<PolymorphicProps<E, Props>>
) => {
  const {
    as: Comp = "button",
    children,
    className,
    disabled = false,
    isLoading = false,
    theme = "jaffa",
    ...restProps
  } = props;

  const content = isLoading ? (
    <span className="opacity-0">{children}</span>
  ) : (
    children
  );

  return (
    <Comp
      {...restProps}
      className={twMerge(
        "shadow-xs relative inline-flex cursor-pointer select-none items-center justify-center rounded-lg px-[18px] py-2 text-center font-medium transition-colors",
        (isLoading || disabled) && "pointer-events-none",

        // jaffa
        theme === "jaffa" &&
          "bg-jaffa text-white hover:bg-jaffa hover:brightness-110 focus:bg-jaffa focus:brightness-90 active:brightness-90",
        theme === "jaffa" && disabled && "bg-jaffa/50",

        // jaffa-transparent
        theme === "jaffa-transparent" &&
          "bg-transparent inner-border inner-border-jaffa",
        theme === "jaffa-transparent" && disabled && "bg-jaffa/50",

        // white
        theme === "white" &&
          "bg-white text-jaffa inner-border inner-border-jaffa/50 hover:bg-white hover:brightness-95 focus:bg-athensGray active:brightness-95",
        theme === "white" && disabled && "text-jaffa",

        // oxfordBlue
        theme === "oxfordBlue" &&
          "bg-oxfordBlue text-white hover:brightness-90 active:brightness-105",
        theme === "oxfordBlue" && disabled && "bg-oxfordBlue/80",
        className
      )}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner
            className={twMerge(
              "size-4",
              theme === "jaffa" && "stroke-white/60 text-jaffa/60"
            )}
          />
        </span>
      )}
      {content}
    </Comp>
  );
};
