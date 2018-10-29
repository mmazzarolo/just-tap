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

const timerSaga = function*() {
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

const boardClearSaga = function*() {
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

const roundSaga = function*() {
  const { isTimeLimitReached, isBoardClear } = yield race({
    isTimeLimitReached: call(timerSaga),
    isBoardClear: call(boardClearSaga)
  });
  if (isTimeLimitReached) {
    yield put(actions.endGame());
  } else {
    yield delay(250 * 2);
    yield put(actions.endRound());
  }
};

export const rootSaga = function*() {
  yield all([
    takeEvery(
      [getType(actions.startGame), getType(actions.startNextRound)],
      roundSaga
    )
  ]);
};
