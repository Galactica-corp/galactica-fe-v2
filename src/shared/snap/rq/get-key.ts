import {
  WalletInvokeSnapMethod,
  WalletMethod as WalletMethodType,
} from "../types/rpc-schema";

export function getKey<
  WalletMethod extends Exclude<WalletMethodType, "wallet_invokeSnap">,
  Params,
>(walletMethod: WalletMethod, params: Params): ["snap", WalletMethod, Params];

export function getKey<
  WalletMethod extends "wallet_invokeSnap",
  RequestMethod extends WalletInvokeSnapMethod,
  Params,
>(
  walletMethod: WalletMethod,
  requestMethod: RequestMethod,
  params: Params
): ["snap", WalletMethod, RequestMethod, Params];

export function getKey(...args: unknown[]) {
  return ["snap", ...args];
}
