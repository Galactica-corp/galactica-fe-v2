import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSectionsQuery } from "shared/graphql";

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_QUEST_SERVICE}/api/auth/sign-out`,
        {
          method: "POST",
        }
      );

      return response.ok;
    },
    onSuccess: () => {
      const key = useSectionsQuery.getKey();
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
