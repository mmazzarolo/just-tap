import React, { memo, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Button } from "./Button";
import { useOnMount } from "../utils/useOnMount";

interface Props {
  score: number;
  onRetryPress: () => void;
  onMenuPress: () => void;
}

const animateResult = (
  anims: Animated.Value[],
  toValue: number,
  duration: number,
  stagger: number
) =>
  Animated.stagger(
    stagger,
    anims.map(anim =>
      Animated.timing(anim, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true
      })
    )
  );

const animateEnter = (anims: Animated.Value[]) =>
  animateResult(anims, 1, 500, 300);

const animateExit = (anims: Animated.Value[]) =>
  animateResult(anims, 2, 250, 100);

export const Result = memo((props: Props) => {
  const { score, onRetryPress, onMenuPress } = props;
  console.warn(`Rendering result`);
  const [titleAnim] = useState(new Animated.Value(0));
  const [subtitleAnim] = useState(new Animated.Value(0));
  const [retryButtonAnim] = useState(new Animated.Value(0));
  const [menuButtonAnim] = useState(new Animated.Value(0));
  const anims = [titleAnim, subtitleAnim, retryButtonAnim, menuButtonAnim];

  useOnMount(() => {
    animateEnter(anims).start();
  });

  const handleRetryPress = () => {
    animateExit(anims).start(onRetryPress);
  };
  const handleMenuPress = () => {};

  const opacityRange = {
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [0, 0.2, 1, 0.2, 0]
  };

  const translateYRange = {
    inputRange: [0, 1],
    outputRange: [20, 0]
  };

  const titleOpacity = titleAnim.interpolate(opacityRange);
  const subtitleOpacity = subtitleAnim.interpolate(opacityRange);
  const retryButtonOpacity = retryButtonAnim.interpolate(opacityRange);
  const menuButtonOpacity = menuButtonAnim.interpolate(opacityRange);

  const titleTranslateY = titleAnim.interpolate(translateYRange);
  const subtitleTranslateY = subtitleAnim.interpolate(translateYRange);
  const retryButtonTranslateY = retryButtonAnim.interpolate(translateYRange);
  const menuButtonTranslateY = menuButtonAnim.interpolate(translateYRange);

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
        <Button
          label="Retry"
          onPress={handleRetryPress}
          style={{
            transform: [{ translateY: retryButtonTranslateY }],
            opacity: retryButtonOpacity
          }}
        />
        <Button
          label="Menu"
          onPress={handleMenuPress}
          style={{
            transform: [{ translateY: menuButtonTranslateY }],
            opacity: menuButtonOpacity
          }}
        />
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
  }
});
