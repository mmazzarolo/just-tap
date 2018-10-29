import * as React from "react";
import { Animated, Easing, StyleSheet, Text } from "react-native";
import {
  CELL_SIZE,
  CELL_PADDING,
  TILE_SIZE,
  BORDER_RADIUS,
  LETTER_SIZE
} from "../config/metrics";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { COLOR_SHUTTLE_GRAY, COLOR_WHITE } from "../config/colors";

interface Props {
  id: number;
  col: number;
  row: number;
  value: number;
  isActive: boolean;
  onPress: (tileId: number) => void;
}

export class Tile extends React.Component<Props> {
  tileAnim: Animated.Value = new Animated.Value(0);

  shouldComponentUpdate(nextProps: Props) {
    return !(this.props.isActive === nextProps.isActive);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isActive && !this.props.isActive) {
      this.animateTap();
    }
  }

  animateTap = () => {
    Animated.timing(this.tileAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.quad,
      useNativeDriver: true
    }).start();
  };

  handleTapStateChange = (event: any) => {
    if (event.nativeEvent.state === State.BEGAN) {
      this.props.onPress(this.props.id);
    }
  };

  render() {
    console.log(`render tile ${this.props.id}`);
    const { isActive } = this.props;
    const { id, col, row, value } = this.props;
    const coordinatesStyle = {
      left: col * CELL_SIZE + CELL_PADDING,
      top: row * CELL_SIZE + CELL_PADDING
    };
    const scale = this.tileAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2]
    });
    const opacity = this.tileAnim.interpolate({
      inputRange: [0, 0.2, 0.5, 1],
      outputRange: [1, 0.5, 0.25, 0]
    });
    return (
      <TapGestureHandler
        onHandlerStateChange={this.handleTapStateChange}
        enabled={isActive}
      >
        <Animated.View
          pointerEvents={isActive ? "auto" : "none"}
          style={[
            coordinatesStyle,
            styles.container,
            styles.containerActive,
            {
              opacity,
              transform: [{ scale }]
            }
          ]}
        >
          <Text style={styles.text}>{value}</Text>
        </Animated.View>
      </TapGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center"
  },
  containerActive: {
    backgroundColor: COLOR_WHITE,
    // backgroundColor: "#6086FF",
    elevation: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 1.0)"
  },
  text: {
    color: COLOR_SHUTTLE_GRAY,
    // color: COLOR_WHITE,
    fontSize: LETTER_SIZE,
    backgroundColor: "transparent"
  }
});
