import React, { FunctionComponent, memo } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";

interface Props {
  label: string | number;
  onPress: () => void;
  style?: any; // https://stackoverflow.com/questions/51521809/typescript-definitions-for-animated-views-style-prop
}

export const Button: FunctionComponent<Props> = memo(props => {
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
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    color: COLOR_SHUTTLE_GRAY
  }
});
