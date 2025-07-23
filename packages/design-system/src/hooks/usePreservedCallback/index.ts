/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";

export function usePreservedCallback<Callback extends (...args: any[]) => unknown>(
  callback: Callback,
) {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as Callback;
}
