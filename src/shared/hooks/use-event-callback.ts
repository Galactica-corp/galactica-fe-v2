/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

export const useEventCallback = <Cb extends (...args: any) => any>(cb: Cb) => {
  const ref = useRef(cb);
  ref.current = cb;

  return useCallback((...params: Parameters<Cb>) => {
    return ref.current(...params);
  }, []) as Cb;
};
