import { AsyncStorage } from "react-native";
import { put } from "redux-saga/effects";
import { actions } from "./../actions/index";

export const rehydrateSaga = function*() {
  const storedReduxState = yield AsyncStorage.getItem("REDUX_STATE");
  const reduxState = storedReduxState ? JSON.parse(storedReduxState) : {};
  yield put(actions.rehydrateSuccess(reduxState));
};
