import React, { FunctionComponent } from "react";
import { useMappedState } from "redux-react-hook";
import { ReduxState } from "../types/ReduxState";
import { Screen } from "../types/Screen";
import { Playground } from "./Playground";
import { Menu } from "../components/Menu";

const mapState = (state: ReduxState) => ({
  currentRoute: state.router.currentScreen
});

export const Router: FunctionComponent = () => {
  const { currentRoute } = useMappedState(mapState);
  switch (currentRoute) {
    case Screen.MENU:
      return <Menu />;
    case Screen.PLAYGROUND:
      return <Playground />;
    default:
      return <Playground />;
  }
};

export default Router;
