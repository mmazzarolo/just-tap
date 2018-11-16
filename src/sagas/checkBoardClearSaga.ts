import { select, take } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { actions } from "./../actions/index";
import { getIsBoardClear } from "./../reducers/gameReducer";

export const checkBoardClearSaga = function*() {
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
