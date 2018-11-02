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
  children: React.ReactNode;
}

export const Touchable = React.memo((props: Props) => {
  const { instant, onPress, children } = props;
  const handleHandlerStateChange = (event: TapGestureHandlerGestureEvent) => {
    const { instant, onPress } = props;
    const state = event.nativeEvent.state;
    if (instant) {
      if (state === State.BEGAN) onPress();
    } else {
      if (state === State.ACTIVE) onPress();
    }
  };

  return (
    <TapGestureHandler onHandlerStateChange={handleHandlerStateChange}>
      {children}
    </TapGestureHandler>
  );
});
