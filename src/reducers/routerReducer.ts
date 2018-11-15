import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "./../types/ReduxAction";
import { Screen } from "./../types/Screen";

export type State = {
  readonly currentScreen: Screen;
};

export const initialState: State = {
  currentScreen: Screen.MENU
};

export const routerReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.navigateTo): {
        draft.currentScreen = action.payload;
        break;
      }
      default:
        return state;
    }
  });
};
