import React, { FunctionComponent, memo, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { TapGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Touchable } from "./Touchable";
import { MENU_ANIM_DURATION } from "../config/constants";

const RADIUS = 10;
const RIPPLE_ANIM_DURATION = MENU_ANIM_DURATION;

interface Props {
  onPress: () => void;
}

interface RippleLocation {
  top: number;
  left: number;
}

export const RippleEffect: FunctionComponent<Props> = memo(props => {
  const { children, onPress } = props;
  const [rippleAnim] = useState(new Animated.Value(0));
  const [rippleLocation, setRippleLocation] = useState<RippleLocation | null>(
    null
  );

  const handlePress = (event: TapGestureHandlerGestureEvent) => {
    const hasAlreadyBeenPressed = !!rippleLocation;
    if (hasAlreadyBeenPressed) return;

    const { absoluteX, absoluteY } = event.nativeEvent;
    setRippleLocation({ top: absoluteY, left: absoluteX });

    Animated.timing(rippleAnim, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: RIPPLE_ANIM_DURATION,
      useNativeDriver: true
    }).start();

    onPress();
  };

  let rippleComputedStyle = {};
  if (rippleLocation) {
    rippleComputedStyle = {
      top: rippleLocation.top,
      left: rippleLocation.left,
      opacity: rippleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0]
      }),
      transform: [
        {
          scale: rippleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 20]
          })
        }
      ]
    };
  }

  return (
    <Touchable onPress={handlePress}>
      <>
        {children}
        {rippleLocation && (
          <Animated.View style={[styles.ripple, rippleComputedStyle]} />
        )}
      </>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  ripple: {
    position: "absolute",
    backgroundColor: COLOR_SHUTTLE_GRAY,
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    overflow: "hidden"
  }
});
