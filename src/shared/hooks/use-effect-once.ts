import { EffectCallback, useEffect, useState } from "react";

import { useEventCallback } from "./use-event-callback";

export const useEffectOnce = (cb: EffectCallback, when?: boolean) => {
  const [canExecute, setCanExecute] = useState(true);
  const eventCallback = useEventCallback(cb);

  useEffect(() => {
    if (!canExecute || !when) return;

    setCanExecute(false);
    return eventCallback();
  }, [eventCallback, canExecute, when]);
};
