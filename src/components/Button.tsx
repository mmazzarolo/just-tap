import React, { memo } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";

interface Props {
  label: string | number;
  onPress: () => void;
  style?: ViewStyle;
}

export const Button = memo((props: Props) => {
  const { label, onPress, style } = props;

  return (
    <Animated.View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  label: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: COLOR_SHUTTLE_GRAY,
    fontWeight: "400",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  }
});
