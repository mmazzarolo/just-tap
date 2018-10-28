import { delay } from "./../utils/delay";
import { actions } from "./../actions/index";
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ReduxState } from "../types/ReduxState";
import { ReduxAction } from "../types/ReduxAction";

export const runTimerThunk: ActionCreator<
  ThunkAction<Promise<ReduxAction | void>, ReduxState, null, ReduxAction>
> = (text: string) => {
  return async dispatch => {
    while (true) {
      await delay(1000);
      dispatch(actions.timerTick());
    }
  };
};
