import { put } from "redux-saga/effects";
import { actions } from "./../actions/index";

export const runGameSaga = function*() {
  yield put(actions.startNewRound());
};
