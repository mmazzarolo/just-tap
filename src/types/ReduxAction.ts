import { ActionType, getType } from "typesafe-actions";

import * as gameActions from "../actions/gameActions";

export type ReduxAction = ActionType<typeof gameActions>;
