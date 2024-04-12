/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, ElementType } from "react";

export type ClassName = {
  className?: string;
};

export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

type AsProp<E extends ElementType> = {
  as?: E;
};

export type PolymorphicProps<
  E extends ElementType,
  P = Record<string, unknown>,
> = AsProp<E> &
  P &
  DistributiveOmit<ComponentPropsWithoutRef<E>, keyof AsProp<E> | keyof P>;
