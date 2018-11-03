import { usePrevious } from "./usePrevious";

export function useWhenIncreases(f: Function, value: any) {
  const prevValue = usePrevious(value);
  if (prevValue < value) f();
}
