import {
  WalletInvokeSnapMethod,
  WalletInvokeSnapRpcSchema,
} from "./rpc-schema";

export type InvokeSnapRpcOptions<RequestMethod extends WalletInvokeSnapMethod> =
  {
    Method: "wallet_invokeSnap";
    Parameters: {
      request: {
        method: RequestMethod;
      };
    };
  };

export type GetInvokeSnapParams<RequestMethod extends WalletInvokeSnapMethod> =
  Extract<
    WalletInvokeSnapRpcSchema[number],
    InvokeSnapRpcOptions<RequestMethod>
  >["Parameters"]["request"]["params"];

export type GetInvokeSnapResponse<
  RequestMethod extends WalletInvokeSnapMethod,
> = Extract<
  WalletInvokeSnapRpcSchema[number],
  InvokeSnapRpcOptions<RequestMethod>
>["ReturnType"];
