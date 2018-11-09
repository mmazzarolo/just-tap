import React, { memo, useState } from "react";
import { useMappedState } from "redux-react-hook";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CELL_SIZE } from "../config/metrics";
import {
  BOARD_COLS,
  BOARD_ROWS,
  PREPARE_BOARD_DURATION,
  CLEANUP_BOARD_DURATION
} from "../config/constants";
import { Tile } from "./Tile";
import { Interlude } from "./Interlude";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { GameStatus } from "../types/GameStatus";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Result } from "./Result";
import { useMappedActions } from "../utils/useMappedActions";
import { useOnMount } from "../utils/useOnMount";
import { useOnUpdate } from "../utils/useOnUpdate";

const mapState = (state: ReduxState) => ({
  gameStatus: state.game.gameStatus,
  timeLeft: state.game.timeLeft,
  items: state.game.board,
  score: state.game.score
});

const mapActions = {
  startGame: actions.startGame,
  tap: actions.tap
};

export const Playground = memo(() => {
  const { items, gameStatus, timeLeft, score } = useMappedState(mapState);
  const { startGame, tap } = useMappedActions(mapActions);
  const [boardAnim] = useState(new Animated.Value(1));
  const [timerAnim] = useState(new Animated.Value(0));

  // const animateBoardPrepare = Animated.timing(boardAnim, {
  //   toValue: 1,
  //   duration: PREPARE_BOARD_DURATION,
  //   useNativeDriver: true
  // });
  const animateBoardCleanup = Animated.timing(boardAnim, {
    toValue: 0,
    duration: CLEANUP_BOARD_DURATION,
    useNativeDriver: true
  });
  const animateShowTimer = Animated.timing(timerAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true
  });

  useOnMount(() => {
    startGame();
  });

  const handleRetryPress = () => {
    startGame();
  };

  // useOnUpdate(prevGameStatus => {
  //   if (
  //     prevGameStatus !== gameStatus &&
  //     gameStatus === GameStatus.ENDING_GAME
  //   ) {
  //     animateBoardPrepare.start();
  //   }
  // }, gameStatus);

  useOnUpdate(prevGameStatus => {
    const isEndingGame =
      prevGameStatus !== gameStatus && gameStatus === GameStatus.ENDING_GAME;
    if (isEndingGame) animateBoardCleanup.start();
  }, gameStatus);

  useOnUpdate(prevGameStatus => {
    const isPlaying =
      prevGameStatus !== gameStatus && gameStatus === GameStatus.PLAYING;
    if (isPlaying) animateShowTimer.start();
  }, gameStatus);

  const timerOpacity = timerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  const boardOpacity = boardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  const boardTranslateY = boardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });

  return (
    <View style={styles.container}>
      {(gameStatus === GameStatus.PLAYING ||
        gameStatus === GameStatus.STARTING_NEW_ROUND ||
        gameStatus === GameStatus.ENDING_GAME) && (
        <>
          {gameStatus === GameStatus.PLAYING && (
            <Animated.Text style={[styles.timer, { opacity: timerOpacity }]}>
              {timeLeft}
            </Animated.Text>
          )}
          <Animated.View
            style={[
              styles.board,
              {
                opacity: boardOpacity,
                transform: [{ translateY: boardTranslateY }]
              }
            ]}
          >
            {items.map(item => (
              <Tile
                key={item.id}
                {...item}
                disabled={gameStatus !== GameStatus.PLAYING}
                onPress={tap}
              />
            ))}
          </Animated.View>
        </>
      )}
      {gameStatus === GameStatus.SHOWING_INTERLUDE && <Interlude />}
      {gameStatus === GameStatus.SHOWING_RESULT && (
        <Result
          score={score}
          onMenuPress={() => null}
          onRetryPress={handleRetryPress}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  board: {
    width: CELL_SIZE * BOARD_ROWS,
    height: CELL_SIZE * BOARD_COLS
  },
  timer: {
    color: COLOR_SHUTTLE_GRAY,
    position: "absolute",
    alignSelf: "center",
    textAlign: "center",
    top: 0,
    left: 0,
    width: "100%",
    marginTop: 40,
    fontSize: 22
  }
});
