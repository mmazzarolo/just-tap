import { useEffect } from "react";

export const useWhenFalse = (fun: Function, value: any) => {
  const effect = () => {
    if (!value) fun();
  };
  useEffect(effect, [value]);
};
