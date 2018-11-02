import * as React from "react";

export const useEffectWhenTrue = (fun: Function, value: any) => {
  const effect = () => {
    if (value) fun();
  };
  React.useEffect(effect, [value]);
};
