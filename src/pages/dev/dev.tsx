import { useAuthMutation } from "shared/api";
import { useInvokeSnapMutation } from "shared/snap/rq";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const clearMutation = useInvokeSnapMutation("clearStorage");
  const listMutation = useInvokeSnapMutation("listZkCerts");

  const mutation = useAuthMutation();

  return (
    <div className="flex gap-x-3">
      <Button
        onClick={() => {
          mutation.mutate({});
        }}
      >
        Auth
      </Button>

      <Button
        onClick={() => {
          clearMutation.mutate();
        }}
      >
        ClearStorage
      </Button>

      <Button
        onClick={() => {
          listMutation.mutate(
            {},
            {
              onSuccess(data) {
                console.log(data);
              },
            }
          );
        }}
      >
        List zk cert
      </Button>
    </div>
  );
};
