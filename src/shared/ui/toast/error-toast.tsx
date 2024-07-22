import { useCopyToClipboard } from "@uidotdev/usehooks";

import { ErrorIcon, Icon } from "../icon";

type Props = {
  details?: string;
  message: string;
};

export const ErrorToast = ({ message, details }: Props) => {
  const [value, copy] = useCopyToClipboard();

  return (
    <div className="flex items-start gap-x-5">
      <ErrorIcon />
      <div className="flex flex-col gap-y-0.5">
        <h5 className="line-clamp-3 overflow-hidden font-medium">{message}</h5>
        {details && (
          <p className="line-clamp-4 text-sm text-pickledBluewood">{details}</p>
        )}

        <button
          className="mt-3 flex items-center gap-x-1.5 text-basketBallOrange"
          onClick={async () => {
            await copy(`message: ${message}; details: ${details}`);
          }}
        >
          <Icon
            className="size-5 text-basketBallOrange hover:brightness-105"
            name={value ? "verifiedCheck" : "copy"}
          />
          {value ? "Copied" : "Copy error message"}
        </button>
      </div>
    </div>
  );
};
