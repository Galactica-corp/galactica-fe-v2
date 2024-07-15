import { ToastContentProps } from "react-toastify";

import { ErrorIcon } from "../icon";
import { ErrorData } from "./types";

export const ErrorToast = (props: ToastContentProps<ErrorData>) => {
  const { data } = props;

  return (
    <div className="flex items-start gap-x-5">
      <ErrorIcon />
      <div className="flex flex-col gap-y-0.5">
        <h5 className="line-clamp-3 block font-medium">{data.message}</h5>
        {data.details && (
          <p className="line-clamp-4 text-sm text-pickledBluewood">
            {data.details}
          </p>
        )}
      </div>
    </div>
  );
};
