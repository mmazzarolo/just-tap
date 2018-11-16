import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "./../types/ReduxAction";
import { ReduxState } from "./../types/ReduxState";

export type State = {
  readonly isRehydrated: boolean;
  readonly isRehydrating: boolean;
};

export const initialState: State = {
  isRehydrated: false,
  isRehydrating: false
};

export const appReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.rehydrate): {
        draft.isRehydrating = true;
        break;
      }
      case getType(actions.rehydrateSuccess): {
        draft.isRehydrated = true;
        draft.isRehydrating = false;
        break;
      }
      default:
        return state;
    }
  });
};

export const getIsAppReady = (state: ReduxState) => state.app.isRehydrated;
