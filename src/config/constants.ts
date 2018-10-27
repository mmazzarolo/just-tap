import { Platform } from "react-native";

export const IS_ENV_DEVELOPMENT = __DEV__;
export const IS_ANDROID = Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";
export const IS_DEBUG_MODE_ENABLED = Boolean(window.navigator.userAgent);
export const BOARD_ROWS = 3;
export const BOARD_COLS = 3;
export const INITIAL_TIME = 30;
