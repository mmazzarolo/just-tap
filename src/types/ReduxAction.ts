import { ActionType, getType } from "typesafe-actions";

import * as gameActions from "../actions/gameActions";
import * as routerActions from "../actions/routerActions";

export type ReduxAction = ActionType<typeof gameActions> &
  ActionType<typeof routerActions>;
