import { createStandardAction } from "typesafe-actions";

export const startGame = createStandardAction("game/START_GAME")();

export const tap = createStandardAction("game/TAP")<number>();

export const timerTick = createStandardAction("game/TIMER_TICK")();
