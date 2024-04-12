import { PropsWithChildren, ReactNode, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

import { QueryErrorResetBoundary } from "@tanstack/react-query";

import { Button } from "shared/ui/button";

type Props = {
  fallbackRender?: (props: FallbackProps) => ReactNode;
  loading?: ReactNode;
};

const defaultLoading = <div>Loading...</div>;
const defaultFallbackRender = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      There was an error!
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export const SuspenseQuery = ({
  children,
  fallbackRender = defaultFallbackRender,
  loading = defaultLoading,
}: PropsWithChildren<Props>) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallbackRender={fallbackRender} onReset={reset}>
          <Suspense fallback={loading}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
