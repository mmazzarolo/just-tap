import React, { FunctionComponent, memo, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { useOnUpdate } from "../utils/useOnUpdate";

interface Props {
  status: "showing" | "hiding";
  enterDuration?: number;
  exitDuration?: number;
  onShow?: () => void;
  onHide?: () => void;
  style: any;
}

const animate = (
  animatedValues: Animated.Value[],
  toValue: number,
  duration: number
) => {
  const staggerDuration = duration / animatedValues.length / 1.5;
  const animDuration =
    duration / animatedValues.length +
    staggerDuration * (animatedValues.length - 1);
  return Animated.stagger(
    staggerDuration,
    animatedValues.map(anim =>
      Animated.timing(anim, {
        toValue: toValue,
        easing: Easing.out(Easing.ease),
        duration: animDuration,
        useNativeDriver: true
      })
    )
  );
};

const animateEnter = (animatedValues: Animated.Value[], duration: number) =>
  animate(animatedValues, 1, duration);

const animateExit = (animatedValues: Animated.Value[], duration: number) =>
  animate(animatedValues, 2, duration);

export const StaggerAnimator: FunctionComponent<Props> = memo(props => {
  const {
    children,
    status,
    onShow = () => null,
    onHide = () => null,
    enterDuration = 500,
    exitDuration = 500,
    style
  } = props;
  const animatedValues = React.Children.map(children, () => {
    const animatedValueRef = useRef(new Animated.Value(0));
    const animatedValue = animatedValueRef.current;
    return animatedValue;
  });

  const childrenOpacity = animatedValues.map(animatedValue => {
    return animatedValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2],
      outputRange: [0, 0.2, 1, 0.2, 0]
    });
  });

  const childrenTranslateY = animatedValues.map(animatedValue => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });
  });

  useOnUpdate(prevStatus => {
    if (prevStatus !== status) {
      if (status === "showing") {
        animateEnter(animatedValues, enterDuration).start(onShow);
      } else if (status === "hiding") {
        animateExit(animatedValues, exitDuration).start(onHide);
      }
    }
  }, status);

  return (
    <View style={style}>
      {React.Children.map(children, (child, index) => {
        const animatedChild = child as React.ReactElement<any>;
        const animationStyle = {
          opacity: childrenOpacity[index],
          transform: [{ translateY: childrenTranslateY[index] }]
        };
        return React.cloneElement(animatedChild, {
          ...animatedChild.props,
          style: [animatedChild.props.style, animationStyle]
        });
      })}
    </View>
  );
});
