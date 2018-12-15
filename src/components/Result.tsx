import React, { memo, useState, FunctionComponent } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Button } from "./Button";
import { StaggerAnimator } from "./StaggerAnimator";
import { delay } from "../utils/delay";

interface Props {
  score: number;
  onRetryPress: () => void;
  onMenuPress: () => void;
}

export const Result: FunctionComponent<Props> = memo(props => {
  const { score, onRetryPress, onMenuPress } = props;
  const [animationStatus, setAnimationStatus] = useState<"showing" | "hiding">(
    "showing"
  );

  const handleRetryPress = async () => {
    setAnimationStatus("hiding");
    await delay(800);
    onRetryPress();
  };

  const handleMenuPress = async () => {
    setAnimationStatus("hiding");
    await delay(800);
    onMenuPress();
  };

  return (
    <StaggerAnimator
      style={styles.container}
      status={animationStatus}
      enterDuration={800}
      exitDuration={800}
    >
      <Animated.View>
        <Text style={styles.title}>Time out.</Text>
      </Animated.View>
      <Animated.View>
        <Text style={styles.subtitle}>{`Score: ${score}`}</Text>
      </Animated.View>
      <Button
        label="Retry"
        onPress={handleRetryPress}
        style={styles.retryButton}
      />
      <Button
        label="Menu"
        onPress={handleMenuPress}
        style={styles.menuButton}
      />
    </StaggerAnimator>
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
  retryButton: {
    position: "absolute",
    left: 0,
    bottom: 60,
    width: "100%"
  },
  menuButton: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%"
  }
});
