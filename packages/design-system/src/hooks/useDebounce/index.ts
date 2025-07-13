import { useEffect, useMemo } from "react";
import type { DebouncedFunc } from "lodash";
import debounce from "lodash.debounce";

import { usePreservedCallback } from "../usePreservedCallback";
import { usePreservedReference } from "../usePreservedReference";

/**
 * 함수를 디바운스 처리하는 훅
 * @param callback 디바운스할 함수
 * @param wait 디바운스 대기 시간 (ms) (default: 500ms)
 * @param options lodash.debounce 옵션
 * @returns 디바운스된 함수
 */
export function useDebounce<Args extends unknown[], R>(
  callback: (...args: Args) => R,
  wait = 500,
  options: Parameters<typeof debounce>[2] = {},
): DebouncedFunc<(...args: Args) => R> {
  const preservedCallback = usePreservedCallback(callback);
  const preservedOptions = usePreservedReference(options);

  const debounced = useMemo(() => {
    return debounce(preservedCallback, wait, preservedOptions);
  }, [preservedCallback, preservedOptions, wait]);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  return debounced;
}
