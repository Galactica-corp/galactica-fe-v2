import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { twMerge } from "tailwind-merge";

import { Icon } from "shared/ui/icon";
import { Spinner } from "shared/ui/spinner";
import { sleep } from "shared/utils";

type UploadProps = {
  className?: string;
};

export const Upload = ({ className }: UploadProps) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async () => {
    // test
    setLoading(true);
    await sleep(1000);
    setLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      className={twMerge(
        "relative flex h-[500px] w-full items-center justify-center rounded-xl border border-dawnPink bg-white",
        isDragActive && "bg-iron",
        className
      )}
      {...getRootProps()}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div className="place-center absolute h-auto w-[300px]">
          <div className="relative size-full">
            <div className="relative m-auto mb-3 size-[40px] rounded-lg border border-dawnPink">
              <Icon className="place-center size-5" name="cloud" />
            </div>
            <div className="text-center">
              <span className="orange-gradient-text mr-1 cursor-pointer text-sm font-semibold leading-none">
                <input {...getInputProps()} />
                Click to upload
              </span>
              <span className="text-sm leading-none text-riverBed">
                or drag and drop
              </span>
              <div className="mt-1 text-xs leading-none text-riverBed">
                JSON file (max. 3mb)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
