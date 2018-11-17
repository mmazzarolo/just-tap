import React, { FunctionComponent } from "react";
import { useMappedState } from "redux-react-hook";
import { useOnMount } from "../utils/useOnMount";
import { getIsAppReady } from "../reducers/appReducer";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { useMappedActions } from "../utils/useMappedActions";
import { Screen } from "../types/Screen";
import { Playground } from "./Playground";
import { Menu } from "./Menu";

const mapState = (state: ReduxState) => ({
  isAppReady: getIsAppReady(state),
  currentRoute: state.router.currentScreen
});

const mapActions = {
  rehydrate: actions.rehydrate
};

export const Router: FunctionComponent = () => {
  const { isAppReady, currentRoute } = useMappedState(mapState);
  const { rehydrate } = useMappedActions(mapActions);

  useOnMount(() => {
    rehydrate();
  });

  if (!isAppReady) {
    return null;
  }

  switch (currentRoute) {
    case Screen.MENU:
      return <Menu />;
    case Screen.PLAYGROUND:
      return <Playground />;
    default:
      return <Playground />;
  }
};
