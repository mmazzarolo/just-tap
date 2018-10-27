import * as React from "react";
import { Provider } from "react-redux";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createReduxStore } from "../utils/createReduxStore";
import Playground from "./Playground";

const store = createReduxStore();

type Props = {};
class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Playground />
      </Provider>
    );
  }
}

export default App;
