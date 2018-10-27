import { createStore, applyMiddleware, compose } from "redux";
import reduxLoggerMiddleware from "redux-logger";
import { rootReducer } from "../reducers";

export const createReduxStore = (initialState?: {}) => {
  const middlewares = [reduxLoggerMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialState!, enhancer);
  // const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  return store;
};
