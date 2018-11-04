import React, { memo, useState } from "react";
import { useMappedState } from "redux-react-hook";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CELL_SIZE } from "../config/metrics";
import { BOARD_COLS, BOARD_ROWS } from "../config/constants";
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
  startNextRound: actions.startNextRound,
  tap: actions.tap
};

export const Playground = memo(() => {
  const { items, gameStatus, timeLeft, score } = useMappedState(mapState);
  const { startGame, startNextRound, tap } = useMappedActions(mapActions);
  const [isBoardClean, setIsBoardClean] = useState(false);
  const [boardCleanupAnim] = useState(new Animated.Value(0));

  const animateBoardCleanup = Animated.timing(boardCleanupAnim, {
    toValue: 3,
    duration: 800,
    useNativeDriver: true
  });

  useOnMount(() => {
    startGame();
  });

  const handleRetryPress = () => {
    setIsBoardClean(false);
    startGame();
  };

  useOnUpdate(prevGameStatus => {
    if (prevGameStatus !== gameStatus && gameStatus === GameStatus.ENDED) {
      animateBoardCleanup.start(() => {
        setIsBoardClean(true);
      });
    }
  }, gameStatus);

  const timerOpacity = boardCleanupAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const boardOpacity = boardCleanupAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const boardTranslateY = boardCleanupAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  });

  return (
    <View style={styles.container}>
      {gameStatus === GameStatus.INTERLUDE && (
        <Interlude onDone={startNextRound} />
      )}
      {(gameStatus === GameStatus.PLAYING ||
        (gameStatus === GameStatus.ENDED && !isBoardClean)) && (
        <>
          <Animated.Text style={[styles.timer, { opacity: timerOpacity }]}>
            {timeLeft}
          </Animated.Text>
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
              <Tile key={item.id} {...item} onPress={tap} />
            ))}
          </Animated.View>
        </>
      )}
      {gameStatus === GameStatus.ENDED &&
        isBoardClean && (
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
