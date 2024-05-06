/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentPropsWithoutRef, ElementType } from "react";

import {
  DefaultError,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

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

export type QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryFn" | "queryKey"
>;

export type MutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;
