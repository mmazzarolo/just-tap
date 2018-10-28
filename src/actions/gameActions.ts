import { createStandardAction } from "typesafe-actions";

export const startGame = createStandardAction("game/START_GAME")();

export const endGame = createStandardAction("game/END_GAME")();

export const startRound = createStandardAction("game/START_ROUND")();

export const endRound = createStandardAction("game/END_ROUND")();

export const tap = createStandardAction("game/TAP")<number>();

export const timerTick = createStandardAction("game/TIMER_TICK")();
