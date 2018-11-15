import React, { memo, FunctionComponent } from "react";
import { Animated } from "react-native";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  State,
  TapGestureHandlerProperties
} from "react-native-gesture-handler";

interface Props extends TapGestureHandlerProperties {
  instant?: boolean;
  disabled?: boolean;
  onPress: (event: TapGestureHandlerGestureEvent) => void;
}

export const Touchable: FunctionComponent<Props> = memo(props => {
  const { instant, onPress, children, disabled, ...otherProps } = props;

  const handleHandlerStateChange = (event: TapGestureHandlerGestureEvent) => {
    const state = event.nativeEvent.state;
    if (instant) {
      if (state === State.BEGAN) onPress(event);
    } else {
      if (state === State.ACTIVE) onPress(event);
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={handleHandlerStateChange}
      enabled={!disabled}
      {...otherProps}
    >
      <Animated.View>{children}</Animated.View>
    </TapGestureHandler>
  );
});
