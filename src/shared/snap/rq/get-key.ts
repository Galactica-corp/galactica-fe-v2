import { Method, WalletMethod } from "../types";

export function getKey<
  TWalletMethod extends Exclude<WalletMethod, "wallet_invokeSnap">,
  Params,
>(walletMethod: TWalletMethod, params: Params): ["snap", TWalletMethod, Params];

export function getKey<
  TWalletMethod extends "wallet_invokeSnap",
  TRequestMethod extends Method,
  Params,
>(
  walletMethod: TWalletMethod,
  requestMethod: TRequestMethod,
  params: Params
): ["snap", TWalletMethod, TRequestMethod, Params];

export function getKey(...args: unknown[]) {
  return ["snap", ...args];
}
