import { toast } from "react-toastify";

import { HttpRequestError, RpcRequestError, WebSocketRequestError } from "viem";

export const catchError = (error: unknown) => {
  console.error(error);
  if (error instanceof RpcRequestError) {
    return toast.error(error.shortMessage);
  }

  if (error instanceof HttpRequestError) {
    return toast.error(error.shortMessage);
  }

  if (error instanceof WebSocketRequestError) {
    return toast.error(error.shortMessage);
  }

  if (
    error instanceof Object &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return toast.error(error.message);
  }

  return toast.error("Something went wrong");
};
