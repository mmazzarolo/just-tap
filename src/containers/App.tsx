import React, { FunctionComponent } from "react";
import { StoreProvider } from "redux-react-hook";
import { createReduxStore } from "../utils/createReduxStore";
import { Router } from "./Router";

const store = createReduxStore();

export const App: FunctionComponent = () => (
  <StoreProvider value={store}>
    <Router />
  </StoreProvider>
);

export default App;
