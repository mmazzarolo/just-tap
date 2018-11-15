import { createStandardAction } from "typesafe-actions";
import { Screen } from "./../types/Screen";

export const navigateTo = createStandardAction("router/NAVIGATE_TO")<Screen>();
