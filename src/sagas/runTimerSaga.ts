import { getTimeLeft } from "./../reducers/gameReducer";
import { actions } from "./../actions/index";
import { eventChannel, END } from "redux-saga";
import { put, take, call, cancelled, select } from "redux-saga/effects";

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

export const runTimerSaga = function*() {
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
