import { useAuthMutation } from "shared/api";
import { useInvokeSnapMutation } from "shared/snap/rq";
import { Button } from "shared/ui/button";

export const Dev = () => {
  const invokeMutation = useInvokeSnapMutation("clearStorage");

  const mutation = useAuthMutation();

  return (
    <div className="flex gap-x-3">
      <Button
        onClick={() => {
          mutation.mutate();
        }}
      >
        Auth
      </Button>

      <Button
        onClick={() => {
          invokeMutation.mutate();
        }}
      >
        ClearStorage
      </Button>
    </div>
  );
};
