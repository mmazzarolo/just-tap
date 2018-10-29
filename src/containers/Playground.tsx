import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { CELL_SIZE } from "../config/metrics";
import { BOARD_COLS, BOARD_ROWS } from "../config/constants";
import { Item } from "../types/Item";
import { Tile } from "../components/Tile";
import { Interlude } from "../components/Interlude";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { GameStatus } from "../types/GameStatus";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";

interface State {}

const mapStateToProps = (state: ReduxState) => ({
  gameStatus: state.game.gameStatus,
  timeLeft: state.game.timeLeft,
  items: state.game.board
});

const mapActionsToProps = {
  startGame: actions.startGame,
  startNextRound: actions.startNextRound,
  tap: actions.tap
};

type Props = {
  timeLeft: number;
  gameStatus: GameStatus;
  items: Item[];
  startNextRound: typeof actions.startNextRound;
  startGame: typeof actions.startGame;
  tap: typeof actions.tap;
};

class Playground extends React.Component<Props, State> {
  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps: Props) {}

  render() {
    const { items, gameStatus, timeLeft, tap, startNextRound } = this.props;
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
      </View>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Playground);
