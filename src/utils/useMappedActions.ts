import * as React from "react";
import { mapValues } from "lodash";
import { useDispatch } from "redux-react-hook";

export function useMappedActions<T>(actionsObj: T): T {
  const dispatch = useDispatch();
  // @ts-ignore
  return mapValues(actionsObj, value =>
    // @ts-ignore
    React.useCallback(x => dispatch(value(x)), [])
  );
}
