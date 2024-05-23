import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import { twMerge } from "tailwind-merge";
import { InternalRpcError } from "viem";

import { EncryptedZkCert } from "shared/snap";
import { useInvokeSnapMutation } from "shared/snap/rq";
import { Icon } from "shared/ui/icon";
import { Spinner } from "shared/ui/spinner";
import { readFileAsJSON } from "shared/utils";

type UploadProps = {
  className?: string;
};

export const Upload = ({ className }: UploadProps) => {
  const mutation = useInvokeSnapMutation("importZkCert");
  const mutateAsync = mutation.mutateAsync;

  const onDrop = useCallback(
    async ([file]: File[], [rejectedFile]: FileRejection[]) => {
      if (rejectedFile) {
        // TODO: toast with error
        return;
      }

      try {
        const encryptedZkCert: EncryptedZkCert = await readFileAsJSON(file);
        const response = await mutateAsync({
          encryptedZkCert,
          listZkCerts: true,
        });
        console.log(response);
      } catch (error) {
        if (error instanceof InternalRpcError) {
          // TODO: toast
        }
      }
    },
    [mutateAsync]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
  });

  return (
    <div
      className={twMerge(
        "relative flex h-[500px] w-full items-center justify-center rounded-xl border border-dawnPink bg-white",
        isDragActive && "bg-iron",
        className
      )}
      {...getRootProps()}
    >
      {mutation.isPending ? (
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
