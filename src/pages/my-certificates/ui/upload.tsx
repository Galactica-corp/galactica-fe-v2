import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { RpcError } from "viem";
import { useAccount } from "wagmi";

import { useCerts } from "entities/cert";
import { EncryptedZkCert } from "shared/snap";
import {
  getZkCertStorageHashesQueryOptions,
  useInvokeSnapMutation,
} from "shared/snap/rq";
import { useSnapClient } from "shared/snap/wagmi";
import { Icon } from "shared/ui/icon";
import { Spinner } from "shared/ui/spinner";
import { readFileAsJSON } from "shared/utils";

type UploadProps = {
  className?: string;
};

export const Upload = ({ className }: UploadProps) => {
  const mutation = useInvokeSnapMutation("importZkCert");
  const mutateAsync = mutation.mutateAsync;
  const queryClient = useQueryClient();

  const { chainId, address } = useAccount();
  const { client } = useSnapClient();

  const { updateCertsStore } = useCerts();

  const onDrop = async ([file]: File[], [rejectedFile]: FileRejection[]) => {
    if (rejectedFile) {
      toast.error("Selected file is wrong");
      return;
    }

    try {
      const encryptedZkCert: EncryptedZkCert = await readFileAsJSON(file);
      const response = await mutateAsync({
        encryptedZkCert,
        listZkCerts: true,
      });

      if ("message" in response) {
        return;
      }

      const hashesResponse = await queryClient.fetchQuery(
        getZkCertStorageHashesQueryOptions({ chainId, address, client })
      );

      updateCertsStore(response, hashesResponse);
    } catch (error) {
      if (error instanceof RpcError) return toast.error(error.message);

      // TODO: sentry event
      toast("Something went wrong");
    }
  };

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
