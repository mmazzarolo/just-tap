import { usePrevious } from "./usePrevious";

export function useOnUpdate<T>(f: (param: T) => void, value: T) {
  const prevValue = usePrevious(value);
  f(prevValue);
}
