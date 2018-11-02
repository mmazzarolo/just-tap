import * as React from "react";
import { Animated, Easing, StyleSheet, Text } from "react-native";
import {
  CELL_SIZE,
  CELL_PADDING,
  TILE_SIZE,
  BORDER_RADIUS,
  LETTER_SIZE
} from "../config/metrics";
import { COLOR_SHUTTLE_GRAY, COLOR_WHITE } from "../config/colors";
import { Item } from "../types/Item";
import { Touchable } from "./Touchable";
import { useEffectWhenFalse } from "../utils/useEffectWhenFalse";

interface Props extends Item {
  onPress: (tileId: number) => void;
}

export const Tile = React.memo((props: Props) => {
  const { id, col, row, letter, isActive, onPress } = props;
  console.log(`Rendering tile ${id}`);
  console.warn("didMount");
  const [anim] = React.useState(new Animated.Value(1));

  const animateTap = () => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 250,
      easing: Easing.quad,
      useNativeDriver: true
    }).start();
  };

  const animateSpawn = () => {
    Animated.sequence([
      Animated.delay(80 * (col + row)),
      Animated.timing(anim, {
        toValue: 0,
        duration: 250,
        easing: Easing.quad,
        useNativeDriver: true
      })
    ]).start();
  };

  React.useEffect(() => {
    animateSpawn();
  }, []);

  useEffectWhenFalse(animateTap, isActive);

  const coordinatesStyle = {
    left: col * CELL_SIZE + CELL_PADDING,
    top: row * CELL_SIZE + CELL_PADDING
  };
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2]
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 0.5, 1],
    outputRange: [1, 0.5, 0.25, 0]
  });

  return (
    <Touchable onPress={() => onPress(id)} enabled={isActive} instant>
      <Animated.View
        pointerEvents={isActive ? "auto" : "none"}
        style={[
          coordinatesStyle,
          styles.container,
          styles.containerActive,
          {
            opacity,
            transform: [{ scale }]
          }
        ]}
      >
        <Text style={styles.text}>{letter}</Text>
      </Animated.View>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center"
  },
  containerActive: {
    backgroundColor: COLOR_WHITE,
    // backgroundColor: "#6086FF",
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 1.0)"
  },
  text: {
    color: COLOR_SHUTTLE_GRAY,
    // color: COLOR_WHITE,
    fontSize: LETTER_SIZE,
    backgroundColor: "transparent"
  }
});
