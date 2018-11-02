import * as React from "react";

export const useEffectWhenFalse = (fun: Function, value: any) => {
  const effect = () => {
    if (!value) fun();
  };
  React.useEffect(effect, [value]);
};
