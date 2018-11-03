import React, { memo, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Touchable } from "./Touchable";
import { useOnMount } from "../utils/useOnMount";

interface Props {
  score: number;
  onRetryPress: () => void;
  onMenuPress: () => void;
}

export const Result = memo((props: Props) => {
  const { score, onRetryPress, onMenuPress } = props;
  console.warn(`Rendering interlude`);
  const [titleAnim] = useState(new Animated.Value(0));
  const [subtitleAnim] = useState(new Animated.Value(0));

  const animateEnter = Animated.stagger(300, [
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }),
    Animated.timing(subtitleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })
  ]);

  const animateExit = Animated.stagger(300, [
    Animated.timing(titleAnim, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true
    }),
    Animated.timing(subtitleAnim, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true
    })
  ]);

  useOnMount(() => {
    animateEnter.start();
  });

  const handleRetryPress = () => {
    animateExit.start(onRetryPress);
  };
  const handleMenuPress = () => {};

  const titleOpacity = titleAnim.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [0, 0.2, 1, 0.2, 0]
  });
  const titleTranslateY = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });
  const subtitleOpacity = subtitleAnim.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [0, 0.2, 1, 0.2, 0]
  });
  const subtitleTranslateY = subtitleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateY: titleTranslateY }],
          opacity: titleOpacity
        }}
      >
        <Text style={styles.title}>Time out.</Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: subtitleTranslateY }],
          opacity: subtitleOpacity
        }}
      >
        <Text style={styles.subtitle}>{`Score: ${score}`}</Text>
      </Animated.View>
      <View style={styles.buttons}>
        <Touchable onPress={handleRetryPress}>
          <Animated.Text style={styles.button}>Retry</Animated.Text>
        </Touchable>
        <Touchable onPress={handleMenuPress}>
          <Animated.Text style={styles.button}>Menu</Animated.Text>
        </Touchable>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 44,
    color: COLOR_SHUTTLE_GRAY
  },
  subtitle: {
    fontSize: 30,
    color: COLOR_SHUTTLE_GRAY
  },
  buttons: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%"
  },
  button: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: COLOR_SHUTTLE_GRAY,
    fontWeight: "400",
    marginBottom: 30
  }
});
