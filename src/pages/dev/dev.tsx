import { useCerts } from "entities/cert";
import { useInvokeSnapMutation } from "shared/snap/rq";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const invokeMutation = useInvokeSnapMutation("clearStorage");

  const { updateCertsStore } = useCerts();
  return (
    <div>
      <Button
        onClick={() => {
          invokeMutation.mutate(undefined, {
            onSuccess: () => {
              updateCertsStore({ gip1: [], gip2: [] }, { gip1: "", gip2: "" });
            },
          });
        }}
      >
        ClearStorage
      </Button>
    </div>
  );
};
