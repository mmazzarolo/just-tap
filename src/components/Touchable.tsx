import * as React from "react";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  State,
  TapGestureHandlerProperties
} from "react-native-gesture-handler";

interface Props extends TapGestureHandlerProperties {
  instant?: boolean;
  onPress: () => void;
}

export class Touchable extends React.PureComponent<Props> {
  handleHandlerStateChange = (event: TapGestureHandlerGestureEvent) => {
    const { instant, onPress } = this.props;
    const state = event.nativeEvent.state;
    if (instant) {
      if (state === State.BEGAN) onPress();
    } else {
      if (state === State.ACTIVE) onPress();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <TapGestureHandler onHandlerStateChange={this.handleHandlerStateChange}>
        {children}
      </TapGestureHandler>
    );
  }
}
