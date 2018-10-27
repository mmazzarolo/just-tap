import { BOARD_ROWS, BOARD_COLS } from "./../config/constants";
import { times } from "lodash";
import { Item } from "../types/Item";

export const buildItems = (): Item[] => {
  const items: Item[] = [];
  times(BOARD_ROWS * BOARD_COLS, n => {
    const item = {
      id: n,
      value: n,
      isActive: true,
      row: Math.floor(n / BOARD_COLS),
      col: Math.floor(n % BOARD_COLS)
    };
    items.push(item);
  });
  return items;
};
