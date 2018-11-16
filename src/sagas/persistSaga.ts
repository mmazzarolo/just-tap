import { ReduxState } from "./../types/ReduxState";
import { AsyncStorage } from "react-native";
import { select } from "redux-saga/effects";
import { ReduxPersistedState } from "../types/ReduxPersistedState";

export const persistSaga = function*() {
  const reduxState: ReduxState = yield select();
  const reduxStateToPersist: ReduxPersistedState = { stats: reduxState.stats };
  AsyncStorage.setItem("REDUX_STATE", JSON.stringify(reduxStateToPersist));
};
