import { createStandardAction } from "typesafe-actions";

export const startGame = createStandardAction("game/START_GAME")();
export const startNewRound = createStandardAction("game/START_NEW_ROUND")();
export const play = createStandardAction("game/PLAY")();
export const showInterlude = createStandardAction("game/SHOW_INTERLUDE")();
export const endGame = createStandardAction("game/END_GAME")();
export const showResult = createStandardAction("game/SHOW_RESULT")();
export const tap = createStandardAction("game/TAP")<number>();
export const timerTick = createStandardAction("game/TIMER_TICK")();
