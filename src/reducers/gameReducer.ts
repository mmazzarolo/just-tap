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
import { calculateBonusTime } from "../utils/calculateBonusTime";

export type State = {
  readonly board: Item[];
  readonly gameStatus: GameStatus;
  readonly currentRound: number;
  readonly timeLeft: number;
  readonly score: number;
};

export const initialState: State = {
  gameStatus: GameStatus.STOPPED,
  board: [],
  timeLeft: INITIAL_TIME,
  currentRound: 0,
  score: 0
};

export const gameReducer = (
  state: State = initialState,
  action: ReduxAction
): State => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.startGame): {
        return initialState;
      }
      case getType(actions.startNewRound): {
        draft.timeLeft =
          draft.currentRound === 0
            ? draft.timeLeft
            : draft.timeLeft + calculateBonusTime(state.board);
        draft.board = buildItems();
        draft.gameStatus = GameStatus.STARTING_NEW_ROUND;
        break;
      }
      case getType(actions.play): {
        draft.currentRound++;
        draft.gameStatus = GameStatus.PLAYING;
        break;
      }
      case getType(actions.showInterlude): {
        draft.gameStatus = GameStatus.SHOWING_INTERLUDE;
        break;
      }
      case getType(actions.endGame): {
        draft.gameStatus = GameStatus.ENDING_GAME;
        break;
      }
      case getType(actions.showResult): {
        draft.gameStatus = GameStatus.SHOWING_RESULT;
        break;
      }
      case getType(actions.tap): {
        if (isTapSuccessful(draft.board, action.payload)) {
          draft.board[action.payload].isActive = false;
          draft.score++;
        } else {
          draft.board[action.payload].mistakes++;
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

export const getScore = (state: ReduxState) => state.game.score;
