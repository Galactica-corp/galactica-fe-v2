import { Link, useRouteError } from "react-router-dom";

import { useSessionStorage } from "@uidotdev/usehooks";

import { Button } from "shared/ui/button";

export const ErrorPage = () => {
  const error = useRouteError();

  const [reloadCount, setReloadCount] = useSessionStorage<number>(
    "error-reload-count",
    0
  );

  console.log(error);

  if (
    error instanceof Error &&
    error.message.includes("Failed to fetch dynamically imported module") &&
    error.message.includes("Importing a module script failed") &&
    reloadCount < 3
  ) {
    setReloadCount(reloadCount + 1);
    window.location.reload();
  }

  return (
    <div
      className="flex grow flex-col items-center justify-center"
      id="error-page"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred</p>

      <Button as={Link} className="mt-6" to="/">
        Go to home page
      </Button>
    </div>
  );
};
