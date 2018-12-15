import React, { memo, useState, FunctionComponent } from "react";
import { Animated, StyleSheet } from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { useOnMount } from "../utils/useOnMount";
import { INTERLUDE_DURATION, MENU_ANIM_DURATION } from "../config/constants";
import { StaggerAnimator } from "./StaggerAnimator";

interface Props {
  bonusTime: number;
}

const ANIM_DURATION = INTERLUDE_DURATION / 2;

export const Interlude: FunctionComponent<Props> = memo(props => {
  const { bonusTime } = props;
  const [animationStatus, setAnimationStatus] = useState<"showing" | "hiding">(
    "showing"
  );

  useOnMount(() => {
    setTimeout(() => setAnimationStatus("hiding"), MENU_ANIM_DURATION);
  });

  return (
    <StaggerAnimator
      style={styles.container}
      status={animationStatus}
      enterDuration={ANIM_DURATION}
      exitDuration={ANIM_DURATION}
    >
      <Animated.View>
        <Animated.Text style={styles.title}>Well done.</Animated.Text>
      </Animated.View>
      <Animated.View>
        <Animated.Text style={styles.subtitle}>{`+${bonusTime}`}</Animated.Text>
      </Animated.View>
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
  }
});
