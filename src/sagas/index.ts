import { getIsBoardClear, getTimeLeft } from "./../reducers/gameReducer";
import { getType } from "typesafe-actions";
import { actions } from "./../actions/index";
import { eventChannel, END, delay } from "redux-saga";
import {
  put,
  take,
  takeEvery,
  all,
  call,
  race,
  cancelled,
  select
} from "redux-saga/effects";
import { ReduxState } from "../types/ReduxState";
import {
  PREPARE_BOARD_DURATION,
  CLEANUP_BOARD_DURATION,
  INTERLUDE_DURATION,
  TILE_TAP_ANIM_DURATION
} from "../config/constants";

const timerCountdown = (secs: number) => {
  return eventChannel(emitter => {
    const interval = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        emitter(END);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
};

const runTimerSaga = function*() {
  const timeLeft: number = yield select(getTimeLeft);
  const timerCountdownChannel = yield call(timerCountdown, timeLeft);
  try {
    while (true) {
      yield take(timerCountdownChannel);
      yield put(actions.timerTick());
    }
  } finally {
    if (yield cancelled()) {
      timerCountdownChannel.close();
    }
    return true;
  }
};

const checkBoardClearSaga = function*() {
  while (true) {
    const tapAction: ReturnType<typeof actions.tap> = yield take(
      getType(actions.tap)
    );
    const isBoardClear: boolean = yield select(getIsBoardClear);
    if (isBoardClear) {
      break;
    }
  }
};

const runRoundSaga = function*() {
  yield delay(PREPARE_BOARD_DURATION);
  yield put(actions.play());
  const { isTimeLimitReached, isBoardClear } = yield race({
    isTimeLimitReached: call(runTimerSaga),
    isBoardClear: call(checkBoardClearSaga)
  });
  if (isTimeLimitReached) {
    yield put(actions.endGame());
    yield delay(CLEANUP_BOARD_DURATION);
    yield put(actions.showResult());
  } else {
    yield delay(TILE_TAP_ANIM_DURATION * 2);
    yield put(actions.showInterlude());
    yield delay(INTERLUDE_DURATION);
    yield put(actions.startNewRound());
  }
};

const runGameSaga = function*() {
  yield put(actions.startNewRound());
};

export const rootSaga = function*() {
  yield all([
    takeEvery(getType(actions.startGame), runGameSaga),
    takeEvery(getType(actions.startNewRound), runRoundSaga)
  ]);
};
