import { useCerts } from "entities/cert";
import { useInvokeSnapMutation } from "shared/snap/rq";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const invokeMutation = useInvokeSnapMutation("clearStorage");

  const { setCerts } = useCerts();
  return (
    <div>
      <Button
        onClick={() => {
          invokeMutation.mutate(undefined, {
            onSuccess: () => {
              setCerts({ gip1: [], gip2: [] }, { gip1: "", gip2: "" });
            },
          });
        }}
      >
        ClearStorage
      </Button>
    </div>
  );
};
