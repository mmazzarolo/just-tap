import { useEffect } from "react";

export function useOnMount(f: () => void | (() => void)) {
  useEffect(f, []);
}
