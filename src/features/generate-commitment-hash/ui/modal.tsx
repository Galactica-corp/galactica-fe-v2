import { toast } from "react-toastify";

import { RpcError } from "viem";

import { useInvokeSnapMutation } from "shared/snap/rq";
import { Button } from "shared/ui/button";
import { Icon } from "shared/ui/icon";
import { Modal as M } from "shared/ui/modal";

type Props = { onClose: (isOpen: false) => void; redirectLink: string };

type HolderCommitmentData = {
  encryptionPubKey: string;
  holderCommitment: string;
};

export const Modal = ({ onClose, redirectLink }: Props) => {
  const mutation = useInvokeSnapMutation("getHolderCommitment");

  const onGenerateCommitmentHash = (data: HolderCommitmentData) => {
    console.log("onGenerateCommitmentHash", data);
    const url = new URL(redirectLink);
    url.searchParams.append("holderCommitment", data.holderCommitment);
    url.searchParams.append("encryptionPubKey", data.encryptionPubKey);

    // window.open(url.toString(), "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(mutation.data)).then(() => {
      toast.success("Copied");
    });
  };

  const handleClick = () => {
    mutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
        onGenerateCommitmentHash(data);
      },
      onError: (error) => {
        if (error instanceof RpcError) return toast.error(error.message);

        toast.error("Something went wrong");
      },
    });
  };

  return (
    <M onClose={onClose}>
      {({ onChange }) => (
        <M.Overlay>
          <M.Content className="relative flex w-1/2 max-w-[550px] flex-col items-center px-6 pb-8 pt-6">
            <Icon
              className="absolute right-8 top-8 size-3 cursor-pointer text-santaGrey transition-colors hover:text-riverBed"
              name="cross"
              onClick={() => onChange(false)}
            />
            <Icon className="size-12" name="galactica" />
            <h3 className="mt-4 text-lg font-semibold">
              Generate a Commitment Hash
            </h3>
            <p className="mt-1 text-center text-sm text-riverBed">
              To begin the zkKYC procedure you need to generate a Commitment
              Hash. Only you will know that the wallet address belongs to you.
            </p>
            {mutation.data ? (
              <Button
                className="mt-8 h-11 self-stretch font-semibold"
                onClick={handleCopy}
              >
                Copy
              </Button>
            ) : (
              <Button
                className="mt-8 h-11 self-stretch font-semibold"
                isLoading={mutation.isPending}
                onClick={handleClick}
              >
                Generate & Start KYC
              </Button>
            )}

            <a
              className="mt-2.5 inline-flex text-sm text-riverBed underline"
              href="#"
            >
              Learn More about zkKYC
            </a>
          </M.Content>
        </M.Overlay>
      )}
    </M>
  );
};
