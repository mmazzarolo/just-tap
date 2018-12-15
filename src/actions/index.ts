import { ReduxPersistedState } from "./../types/ReduxPersistedState";
import { createStandardAction } from "typesafe-actions";

export const actions = {
  // Game actions
  startGame: createStandardAction("game/START_GAME")(),
  startNewRound: createStandardAction("game/START_NEW_ROUND")(),
  play: createStandardAction("game/PLAY")(),
  showInterlude: createStandardAction("game/SHOW_INTERLUDE")(),
  endGame: createStandardAction("game/END_GAME")<{ score: number }>(),
  showResult: createStandardAction("game/SHOW_RESULT")(),
  tap: createStandardAction("game/TAP")<number>(),
  timerTick: createStandardAction("game/TIMER_TICK")(),

  // Router actions
  navigateToPlayground: createStandardAction("router/NAVIGATE_TO_PLAYGROUND")(),
  navigateToMenu: createStandardAction("router/NAVIGATE_TO_MENU")(),

  // Other generic actions
  rehydrate: createStandardAction("app/REHYDRATE_REQUEST")(),
  rehydrateSuccess: createStandardAction("app/REHYDRATE_SUCCESS")<
    ReduxPersistedState
  >()
};
