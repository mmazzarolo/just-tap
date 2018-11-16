import { persistSaga } from "./persistSaga";
import { all, takeEvery } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { actions } from "./../actions/index";
import { rehydrateSaga } from "./rehydrateSaga";
import { runGameSaga } from "./runGameSaga";
import { runRoundSaga } from "./runRoundSaga";

export const rootSaga = function*() {
  yield all([
    takeEvery(getType(actions.startGame), runGameSaga),
    takeEvery(getType(actions.startNewRound), runRoundSaga),
    takeEvery(getType(actions.rehydrate), rehydrateSaga),
    takeEvery(getType(actions.endGame), persistSaga)
  ]);
};
