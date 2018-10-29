import { produce } from "immer";
import { getType } from "typesafe-actions";
import { INITIAL_TIME } from "../config/constants";
import { actions } from "../actions";
import { ReduxAction } from "./../types/ReduxAction";
import { GameStatus } from "./../types/GameStatus";
import { ReduxState } from "./../types/ReduxState";
import { buildItems } from "./../utils/buildItems";
import { Item } from "./../types/Item";
import { isTapSuccessful } from "../utils/isTapSuccesful";

export type State = {
  readonly gameStatus: GameStatus;
  readonly board: Item[];
  readonly currentRound: number;
  readonly currentRoundMistakes: number;
  readonly timeLeft: number;
};

export const initialState: State = {
  gameStatus: GameStatus.STOPPED,
  board: [],
  timeLeft: INITIAL_TIME,
  currentRound: 0,
  currentRoundMistakes: 0
};

export const gameReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.startNextRound):
      case getType(actions.startGame): {
        draft.currentRound++;
        draft.gameStatus = GameStatus.PLAYING;
        draft.board = buildItems();
        break;
      }
      case getType(actions.endRound): {
        draft.gameStatus = GameStatus.INTERLUDE;
        break;
      }
      case getType(actions.tap): {
        const tappedItem = draft.board[action.payload];
        if (isTapSuccessful(draft.board, action.payload)) {
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

export const getTimeLeft = (state: ReduxState) => state.game.timeLeft;

export const getIsBoardClear = (state: ReduxState) =>
  !state.game.board.find(x => x.isActive);
