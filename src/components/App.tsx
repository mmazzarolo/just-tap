import * as React from "react";
import { StoreProvider } from "redux-react-hook";
import { createReduxStore } from "../utils/createReduxStore";
import { Playground } from "./Playground";

const store = createReduxStore();

export const App = () => {
  return (
    <StoreProvider value={store}>
      <Playground />
    </StoreProvider>
  );
};

export default App;
