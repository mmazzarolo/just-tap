import React, { memo, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { useOnMount } from "../utils/useOnMount";
import { INTERLUDE_DURATION } from "../config/constants";

interface Props {}

const ANIM_DURATION = INTERLUDE_DURATION / 2;

const animateInterlude = (anims: Animated.Value[], toValue: number) => {
  const staggerDuration = ANIM_DURATION / anims.length / 2;
  const animDuration =
    ANIM_DURATION / anims.length + staggerDuration * (anims.length - 1);
  return Animated.stagger(
    staggerDuration,
    anims.map(anim =>
      Animated.timing(anim, {
        toValue: toValue,
        duration: animDuration,
        useNativeDriver: true
      })
    )
  );
};

const animateEnter = (anims: Animated.Value[]) => animateInterlude(anims, 1);

const animateExit = (anims: Animated.Value[]) => animateInterlude(anims, 2);

export const Interlude = memo((props: Props) => {
  console.warn(`Rendering interlude`);
  const [titleAnim] = useState(new Animated.Value(0));
  const [subtitleAnim] = useState(new Animated.Value(0));
  const anims = [titleAnim, subtitleAnim];

  useOnMount(() => {
    Animated.sequence([animateEnter(anims), animateExit(anims)]).start();
  });

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
        <Animated.Text style={styles.title}>Well done.</Animated.Text>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateY: subtitleTranslateY }],
          opacity: subtitleOpacity
        }}
      >
        <Animated.Text style={styles.subtitle}>+5</Animated.Text>
      </Animated.View>
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
  }
});
