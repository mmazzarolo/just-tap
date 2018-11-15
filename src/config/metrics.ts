import { BOARD_ROWS } from "./constants";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;
export const SIZE = 4;
export const CELL_SIZE = Math.floor((DEVICE_WIDTH * 0.8) / BOARD_ROWS);
export const CELL_PADDING = Math.floor(CELL_SIZE * 0.05);
export const BORDER_RADIUS = CELL_PADDING * 2;
export const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
export const LETTER_SIZE = Math.floor(TILE_SIZE * 0.75);
