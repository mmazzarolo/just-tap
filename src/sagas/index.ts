import { getType } from "typesafe-actions";
import { actions } from "./../actions/index";
import { eventChannel, END } from "redux-saga";
import {
  put,
  take,
  takeEvery,
  all,
  call,
  race,
  cancelled
} from "redux-saga/effects";

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
  // TODO:
  const timerCountdownChannel = yield call(timerCountdown, 4);
  try {
    while (true) {
      const payload = yield take(timerCountdownChannel);
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
    // TODO:
    if (tapAction.payload === 7) {
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
    yield put(actions.endRound());
  }
};

const gameSaga = function*() {
  yield put(actions.startRound());
};

export const rootSaga = function*() {
  yield all([
    takeEvery(getType(actions.startGame), gameSaga),
    takeEvery(getType(actions.startRound), roundSaga)
  ]);
};
