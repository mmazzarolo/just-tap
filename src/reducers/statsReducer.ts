import { produce } from "immer";
import { getType } from "typesafe-actions";
import { actions } from "../actions";
import { ReduxAction } from "./../types/ReduxAction";

export type State = {
  readonly highScore: number;
};

export const initialState: State = {
  highScore: 0
};

export const statsReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.rehydrateSuccess): {
        if (action.payload.stats) {
          draft.highScore = action.payload.stats.highScore;
        }
        break;
      }
      case getType(actions.endGame): {
        if (action.payload.score > state.highScore) {
          draft.highScore = action.payload.score;
        }
        break;
      }
      default:
        return state;
    }
  });
};
