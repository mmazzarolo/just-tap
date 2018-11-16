import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { gameReducer } from "./gameReducer";
import { routerReducer } from "./routerReducer";
import { statsReducer } from "./statsReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
  router: routerReducer,
  stats: statsReducer
});
