import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSessionStore } from "shared/stores";

import { questsQueries } from "./quests/queries";

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  const [sessionId, setSession] = useSessionStore();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_QUEST_SERVICE}/api/auth/sign-out`,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
          method: "POST",
        }
      );

      return response.ok;
    },
    onSuccess: async () => {
      setSession(undefined);
      await queryClient.invalidateQueries({
        queryKey: questsQueries.allSections(),
      });
    },
  });
};
