import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import produce from "immer";
import { CELL_SIZE } from "../config/metrics";
import { BOARD_COLS, BOARD_ROWS, INITIAL_TIME } from "../config/constants";
import { Item } from "../types/Item";
import { buildItems } from "../utils/buildItems";
import { Tile } from "../components/Tile";
import { Interlude } from "../components/Interlude";
import { ReduxState } from "../types/ReduxState";
import { actions } from "../actions";
import { startGame } from "../actions/gameActions";

interface State {}

const mapStateToProps = (state: ReduxState) => ({
  timeLeft: state.game.timeLeft,
  items: state.game.board
});

const mapActionsToProps = {
  startGame: actions.startGame,
  tap: actions.tap
};

type Props = {
  timeLeft: number;
  items: Item[];
  startGame: () => void;
  tap: (itemIndex: number) => void;
};

class Playground extends React.Component<Props, State> {
  componentDidMount() {
    this.props.startGame();
  }
  componentDidUpdate(prevProps: Props, prevState: State) {
    // if (isBoardEmpty(this.state) && !isBoardEmpty(prevState)) {
    // }
  }

  render() {
    const { items, tap } = this.props;
    return (
      <View style={styles.container}>
        {/* <Interlude onDone={() => null} /> */}
        <View style={styles.board}>
          {items.map(item => (
            <Tile key={item.id} {...item} onPress={tap} />
          ))}
        </View>
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
  }
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Playground);

// const isBoardEmpty = (state: State) => {
//   return state.items.filter(x => x.isActive).length === 0;
// };
