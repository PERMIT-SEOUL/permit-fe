import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotNullishValue = {};

export function usePreservedReference<T extends NotNullishValue>(
  value: T,
  areValuesEqual: (a: T, b: T) => boolean = areDeeplyEqual,
) {
  const [reference, setReference] = useState<T>(value);

  useEffect(() => {
    if (!areValuesEqual(value, reference)) {
      setReference(value);
    }
  }, [areValuesEqual, reference, value]);

  return reference;
}

function areDeeplyEqual<T extends NotNullishValue>(x: T, y: T) {
  return JSON.stringify(x) === JSON.stringify(y);
}
