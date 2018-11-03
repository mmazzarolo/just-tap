import React, { memo } from "react";
import { useMappedState } from "redux-react-hook";
import { StyleSheet, Text, View } from "react-native";
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

  useOnMount(() => {
    startGame();
  });

  return (
    <View style={styles.container}>
      {gameStatus === GameStatus.INTERLUDE && (
        <Interlude onDone={startNextRound} />
      )}
      {gameStatus === GameStatus.PLAYING && (
        <>
          <Text style={styles.timer}>{timeLeft}</Text>
          <View style={styles.board}>
            {items.map(item => (
              <Tile key={item.id} {...item} onPress={tap} />
            ))}
          </View>
        </>
      )}
      {gameStatus === GameStatus.ENDED && (
        <Result
          score={score}
          onMenuPress={() => null}
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
