import React, { FunctionComponent, memo, useState } from "react";
import { useMappedState } from "redux-react-hook";
import { Animated, StyleSheet } from "react-native";
import { useOnMount } from "../utils/useOnMount";
import { actions } from "../actions";
import { ReduxState } from "../types/ReduxState";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { useMappedActions } from "../utils/useMappedActions";
import { Screen } from "../types/Screen";
import { RippleEffect } from "./RippleEffect";
import { MENU_ANIM_DURATION } from "../config/constants";

const animateInterlude = (anims: Animated.Value[], toValue: number) => {
  const staggerDuration = MENU_ANIM_DURATION / anims.length / 1.5;
  const animDuration =
    MENU_ANIM_DURATION / anims.length + staggerDuration * (anims.length - 1);
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

const mapState = (state: ReduxState) => ({
  score: state.game.score
});

const mapActions = {
  navigateTo: actions.navigateTo
};

export const Menu: FunctionComponent = memo(() => {
  const { score } = useMappedState(mapState);
  const { navigateTo } = useMappedActions(mapActions);
  const [titleAnim] = useState(new Animated.Value(0));
  const [scoreAnim] = useState(new Animated.Value(0));
  const anims = [titleAnim, scoreAnim];

  useOnMount(() => {
    animateEnter(anims).start();
  });

  const handlePress = () => {
    animateExit(anims).start(() => navigateTo(Screen.PLAYGROUND));
  };

  const titleOpacity = titleAnim.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [0, 0.2, 1, 0.2, 0]
  });
  const titleTranslateY = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });
  const scoreOpacity = scoreAnim.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2],
    outputRange: [0, 0.2, 1, 0.2, 0]
  });

  return (
    <RippleEffect onPress={handlePress}>
      <Animated.View style={styles.container}>
        <Animated.View
          style={{
            transform: [{ translateY: titleTranslateY }],
            opacity: titleOpacity
          }}
        >
          <Animated.Text style={styles.title}>Just tap</Animated.Text>
        </Animated.View>
        <Animated.View
          style={[styles.scoreContainer, { opacity: scoreOpacity }]}
        >
          <Animated.Text style={styles.score}>High score: 123</Animated.Text>
        </Animated.View>
      </Animated.View>
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
