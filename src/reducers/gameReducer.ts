import { buildItems } from "./../utils/buildItems";
import { produce } from "immer";
import { getType } from "typesafe-actions";
import { INITIAL_TIME } from "../config/constants";
import { actions } from "../actions";
import { ReduxAction } from "./../types/ReduxAction";
import { Item } from "./../types/Item";

export type State = {
  readonly gameState: "STOPPED" | "PLAYING";
  readonly board: Item[];
  readonly currentRound: number;
  readonly currentRoundMistakes: number;
  readonly timeLeft: number;
};

export const initialState: State = {
  gameState: "STOPPED",
  board: [],
  timeLeft: INITIAL_TIME,
  currentRound: 1,
  currentRoundMistakes: 0
};

export const gameReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.startGame): {
        draft.board = buildItems();
        break;
      }
      case getType(actions.tap): {
        const tappedItem = draft.board[action.payload];
        const highestBoardValue = Math.max(
          ...draft.board.filter(x => !!x.isActive).map(x => x.value)
        );
        const isValid = tappedItem.value >= highestBoardValue;
        if (isValid) {
          tappedItem.isActive = false;
        } else {
          draft.currentRoundMistakes++;
        }
        break;
      }
      case getType(actions.timerTick): {
        draft.timeLeft--;
        break;
      }
      default:
        return state;
    }
  });
};
