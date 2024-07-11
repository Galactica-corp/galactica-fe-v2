import { useSectionsQuery as useCodegenSectionsQuery } from "shared/graphql";
import { useSessionStore } from "shared/stores";

export const useSectionsQuery = (
  ...params: Parameters<typeof useCodegenSectionsQuery>
) => {
  const [variables, options] = params;
  const [sessionId] = useSessionStore();

  return useCodegenSectionsQuery(variables, {
    ...options,
    enabled: Boolean(sessionId),
  });
};

useSectionsQuery.getKey = useCodegenSectionsQuery.getKey;
