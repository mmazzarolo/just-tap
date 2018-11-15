import { Platform } from "react-native";

export const IS_ENV_DEVELOPMENT = __DEV__;
export const IS_ANDROID = Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";
export const IS_DEBUG_MODE_ENABLED = Boolean(window.navigator.userAgent);
export const BOARD_ROWS = 4;
export const BOARD_COLS = 4;
export const INITIAL_TIME = 20;

export const TILE_TAP_ANIM_DURATION = 250;
export const PREPARE_BOARD_DURATION = 1000;
export const CLEANUP_BOARD_DURATION = 600;
export const INTERLUDE_DURATION = 2000;
export const MENU_ANIM_DURATION = 1000;
