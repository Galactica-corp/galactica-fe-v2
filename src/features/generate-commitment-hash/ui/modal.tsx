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
    const url = new URL(redirectLink);
    url.searchParams.append("holderCommitment", data.holderCommitment);
    url.searchParams.append("encryptionPubKey", data.encryptionPubKey);

    window.open(url.toString(), "_self");
  };

  const handleClick = () => {
    mutation.mutate(undefined, {
      onSuccess: (data) => {
        onGenerateCommitmentHash(data);
      },
      onError: () => {
        // TODO: Alert
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

            <Button
              className="mt-8 h-11 self-stretch font-semibold"
              isLoading={mutation.isPending}
              onClick={handleClick}
            >
              Generate & Start KYC
            </Button>
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
