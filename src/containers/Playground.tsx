import React, { memo, useState, FunctionComponent } from "react";
import { useMappedState } from "redux-react-hook";
import { Animated, StyleSheet, View } from "react-native";
import { CELL_SIZE } from "../config/metrics";
import {
  BOARD_COLS,
  BOARD_ROWS,
  CLEANUP_BOARD_DURATION
} from "../config/constants";
import { Tile } from "../components/Tile";
import { Interlude } from "../components/Interlude";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { GameStatus } from "../types/GameStatus";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Result } from "../components/Result";
import { useMappedActions } from "../utils/useMappedActions";
import { useOnMount } from "../utils/useOnMount";
import { useOnUpdate } from "../utils/useOnUpdate";
import { calculateBonusTime } from "../utils/calculateBonusTime";

const mapState = (state: ReduxState) => ({
  gameStatus: state.game.gameStatus,
  timeLeft: state.game.timeLeft,
  items: state.game.board,
  score: state.game.score
});

const mapActions = {
  startGame: actions.startGame,
  tap: actions.tap,
  navigateToMenu: actions.navigateToMenu
};

export const Playground: FunctionComponent = memo(() => {
  const { items, gameStatus, timeLeft, score } = useMappedState(mapState);
  const { startGame, tap, navigateToMenu } = useMappedActions(mapActions);
  const [boardAnim] = useState(new Animated.Value(1));
  const [timerAnim] = useState(new Animated.Value(0));

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
      {gameStatus === GameStatus.SHOWING_INTERLUDE && (
        <Interlude bonusTime={calculateBonusTime(items)} />
      )}
      {gameStatus === GameStatus.SHOWING_RESULT && (
        <Result
          score={score}
          onMenuPress={navigateToMenu}
          onRetryPress={startGame}
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
