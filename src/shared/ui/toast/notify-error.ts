import { ToastOptions, toast } from "react-toastify";

import { ErrorToast } from "./error-toast";
import { ErrorData } from "./types";

export const notifyError = (
  message: string,
  options?: ToastOptions<ErrorData> | undefined
) => {
  return toast.error(ErrorToast, { ...options, data: { message } });
};
