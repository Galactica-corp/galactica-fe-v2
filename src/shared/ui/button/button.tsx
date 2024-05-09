import { ElementType, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

import { ClassName, PolymorphicProps } from "shared/types";

import { Spinner } from "../spinner";

export type Theme =
  | "basketBallOrange"
  | "basketBallOrange-secondary"
  | "basketBallOrange-transparent"
  | "pickledBluewood"
  | "pickledBluewood-white"
  | "white";

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
    theme = "basketBallOrange",
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
        "relative inline-flex cursor-pointer select-none items-center justify-center rounded-lg px-[18px] py-2 text-center font-medium shadow-xs transition",
        (isLoading || disabled) && "pointer-events-none",

        // basketBallOrange
        theme === "basketBallOrange" &&
          "bg-basketBallOrange text-white hover:bg-basketBallOrange hover:brightness-110 focus:bg-basketBallOrange focus:brightness-90 active:brightness-90",
        theme === "basketBallOrange" && disabled && "bg-basketBallOrange/50",

        // basketBallOrange-transparent
        theme === "basketBallOrange-transparent" &&
          "bg-transparent inner-border inner-border-basketBallOrange",
        theme === "basketBallOrange-transparent" &&
          disabled &&
          "bg-basketBallOrange/50",

        // basketBallOrange-secondary
        theme === "basketBallOrange-secondary" &&
          "bg-sunriseOrange/5 text-sunriseOrange inner-border inner-border-sunriseOrange",
        theme === "basketBallOrange-secondary" &&
          disabled &&
          "bg-basketBallOrange/50",

        // white
        theme === "white" &&
          "bg-white text-basketBallOrange inner-border inner-border-basketBallOrange/50 hover:bg-white hover:brightness-95 focus:bg-catskillWhite active:brightness-95",
        theme === "white" && disabled && "text-basketBallOrange",

        // pickledBluewood
        theme === "pickledBluewood" &&
          "bg-pickledBluewood text-white hover:brightness-90 active:brightness-105",
        theme === "pickledBluewood" && disabled && "bg-pickledBluewood/80",

        // white-pickledBluewood
        theme === "pickledBluewood-white" &&
          "bg-white text-pickledBluewood inner-border inner-border-iron hover:brightness-90 active:brightness-105",
        theme === "pickledBluewood-white" && disabled && "bg-white/80",

        className
      )}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner
            className={twMerge(
              "size-4",
              theme === "basketBallOrange" &&
                "stroke-white/60 text-basketBallOrange/60"
            )}
          />
        </span>
      )}
      {content}
    </Comp>
  );
};
