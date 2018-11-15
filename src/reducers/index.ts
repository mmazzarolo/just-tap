import { combineReducers } from "redux";
import { gameReducer } from "./gameReducer";
import { routerReducer } from "./routerReducer";

export const rootReducer = combineReducers({
  game: gameReducer,
  router: routerReducer
});
