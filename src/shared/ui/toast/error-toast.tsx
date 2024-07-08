import { ToastContentProps } from "react-toastify";

import { twJoin } from "tailwind-merge";

import { Icon } from "../icon";
import { ErrorData } from "./types";

export const ErrorToast = (props: ToastContentProps<ErrorData>) => {
  const { data } = props;
  return (
    <div className="flex items-start gap-x-5">
      <Icon
        className={twJoin(
          "relative size-5 shrink-0 text-grapefruit",
          "after:absolute after:left-1/2 after:top-1/2 after:flex after:size-7 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-grapefruit after:opacity-30",
          "before:absolute before:left-1/2 before:top-1/2 before:flex before:size-9 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border-2 before:border-grapefruit before:opacity-10"
        )}
        name="alertCircle"
      />
      <div className="flex flex-col gap-y-0.5">
        <h5 className="block font-medium">{data.message}</h5>
        <p className="text-sm text-pickledBluewood">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
          voluptates ab voluptatem dolor. Rerum, sed ad totam eveniet quam,
          veritatis voluptatum nemo ipsa fuga minus fugiat distinctio sequi
          ullam reiciendis!
        </p>
      </div>
    </div>
  );
};
