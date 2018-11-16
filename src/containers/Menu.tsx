import React, { FunctionComponent, memo, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { useMappedState } from "redux-react-hook";
import { delay } from "../utils/delay";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { useMappedActions } from "../utils/useMappedActions";
import { RippleEffect } from "../components/RippleEffect";
import { StaggerAnimator } from "../components/StaggerAnimator";
import { MENU_ANIM_DURATION } from "../config/constants";

const mapState = (state: ReduxState) => ({
  highScore: state.stats.highScore
});

const mapActions = {
  navigateToPlayground: actions.navigateToPlayground
};

export const Menu: FunctionComponent = memo(() => {
  const { highScore } = useMappedState(mapState);
  const { navigateToPlayground } = useMappedActions(mapActions);
  const [animationStatus, setAnimationStatus] = useState<"showing" | "hiding">(
    "showing"
  );

  const handlePress = async () => {
    setAnimationStatus("hiding");
    await delay(MENU_ANIM_DURATION);
    navigateToPlayground();
  };

  return (
    <RippleEffect onPress={handlePress}>
      <StaggerAnimator
        style={styles.container}
        status={animationStatus}
        enterDuration={MENU_ANIM_DURATION}
        exitDuration={MENU_ANIM_DURATION}
      >
        <Animated.Text style={styles.title}>Just tap</Animated.Text>
        <Animated.View style={[styles.scoreContainer]}>
          <Animated.Text style={styles.score}>
            {highScore ? `High score: ${highScore}` : ""}
          </Animated.Text>
        </Animated.View>
      </StaggerAnimator>
    </RippleEffect>
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
    fontSize: 66,
    fontWeight: "300",
    color: COLOR_SHUTTLE_GRAY
  },
  scoreContainer: {
    position: "absolute",
    left: 0,
    bottom: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  score: {
    fontSize: 18,
    color: COLOR_SHUTTLE_GRAY
  }
});
