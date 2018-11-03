import { shuffle, times } from "lodash";
import { BOARD_ROWS, BOARD_COLS } from "./../config/constants";
import { Item } from "../types/Item";

export const buildItems = (): Item[] => {
  const values = shuffle(times(BOARD_ROWS * BOARD_COLS));
  const items = values.map((value, index) => {
    return {
      id: index,
      value: value,
      letter: String.fromCharCode(65 + value),
      isActive: true,
      row: Math.floor(index / BOARD_COLS),
      col: Math.floor(index % BOARD_COLS),
      mistakes: 0
    };
  });
  return items;
};
