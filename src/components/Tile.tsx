import React, { memo, useState, FunctionComponent } from "react";
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
import { useWhenFalse } from "../utils/useWhenFalse";
import { useOnMount } from "../utils/useOnMount";
import { useWhenIncreases } from "../utils/useWhenIncreases";
import {
  TILE_TAP_ANIM_DURATION,
  PREPARE_BOARD_DURATION,
  BOARD_ROWS
} from "../config/constants";

interface Props extends Item {
  onPress: (tileId: number) => void;
  disabled?: boolean;
}

const SPAWN_ANIM_DURATION = PREPARE_BOARD_DURATION / BOARD_ROWS;
const SPAWN_ANIM_DELAY = SPAWN_ANIM_DURATION / 3;

export const Tile: FunctionComponent<Props> = memo(props => {
  const { id, col, row, letter, isActive, onPress, mistakes, disabled } = props;
  const [anim] = useState(new Animated.Value(0));

  const animateSpawn = Animated.sequence([
    Animated.delay(SPAWN_ANIM_DELAY * (col + row)),
    Animated.timing(anim, {
      toValue: 1,
      duration: SPAWN_ANIM_DURATION,
      easing: Easing.quad,
      useNativeDriver: true
    })
  ]);

  const animateTap = Animated.timing(anim, {
    toValue: 0,
    duration: TILE_TAP_ANIM_DURATION,
    easing: Easing.quad,
    useNativeDriver: true
  });

  const animateMistake = Animated.sequence([
    Animated.timing(anim, {
      toValue: 2,
      duration: 250,
      easing: Easing.quad,
      useNativeDriver: true
    }),
    Animated.timing(anim, {
      toValue: 1,
      duration: 50,
      easing: Easing.quad,
      useNativeDriver: true
    })
  ]);

  useOnMount(() => {
    animateSpawn.start();
  });

  useWhenFalse(() => animateTap.start(), isActive);

  useWhenIncreases(() => {
    animateMistake.start();
  }, mistakes);

  const coordinatesStyle = {
    left: col * CELL_SIZE + CELL_PADDING,
    top: row * CELL_SIZE + CELL_PADDING
  };
  const rotate = anim.interpolate({
    inputRange: [1, 1.2, 1.4, 1.6, 1.8, 2],
    outputRange: ["0deg", "15deg", "-10deg", "5deg", "-5deg", "0deg"],
    extrapolate: "clamp"
  });
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 1],
    extrapolate: "clamp"
  });
  const opacity = anim.interpolate({
    inputRange: [0, 0.2, 0.5, 1],
    outputRange: [0, 0.25, 0.5, 1],
    extrapolate: "clamp"
  });

  return (
    <Touchable
      onPress={() => onPress(id)}
      enabled={isActive}
      disabled={disabled}
      instant
    >
      <Animated.View
        pointerEvents={isActive ? "auto" : "none"}
        style={[
          coordinatesStyle,
          styles.container,
          styles.containerActive,
          {
            opacity,
            transform: [{ scale }, { rotate }]
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
