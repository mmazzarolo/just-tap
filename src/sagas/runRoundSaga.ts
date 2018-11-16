import { delay } from "redux-saga";
import { call, put, race, select } from "redux-saga/effects";
import {
  CLEANUP_BOARD_DURATION,
  INTERLUDE_DURATION,
  PREPARE_BOARD_DURATION,
  TILE_TAP_ANIM_DURATION
} from "../config/constants";
import { actions } from "./../actions/index";
import { checkBoardClearSaga } from "./checkBoardClearSaga";
import { runTimerSaga } from "./runTimerSaga";
import { getScore } from "../reducers/gameReducer";

export const runRoundSaga = function*() {
  yield delay(PREPARE_BOARD_DURATION);
  yield put(actions.play());
  const { isTimeLimitReached, isBoardClear } = yield race({
    isTimeLimitReached: call(runTimerSaga),
    isBoardClear: call(checkBoardClearSaga)
  });
  if (isTimeLimitReached) {
    const score = yield select(getScore);
    yield put(actions.endGame({ score }));
    yield delay(CLEANUP_BOARD_DURATION);
    yield put(actions.showResult());
  } else {
    yield delay(TILE_TAP_ANIM_DURATION * 2);
    yield put(actions.showInterlude());
    yield delay(INTERLUDE_DURATION);
    yield put(actions.startNewRound());
  }
};
