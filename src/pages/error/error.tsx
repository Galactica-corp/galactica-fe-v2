import { Link } from "react-router-dom";

import { Button } from "shared/ui/button";

export const ErrorPage = () => {
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
