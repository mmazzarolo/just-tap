import * as React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { COLOR_SHUTTLE_GRAY } from "../config/colors";
import { Touchable } from "./Touchable";

interface Props {
  score: number;
  onRetryPress: () => void;
  onMenuPress: () => void;
}

export class Result extends React.Component<Props> {
  titleAnim: Animated.Value = new Animated.Value(0);
  subtitleAnim: Animated.Value = new Animated.Value(0);

  componentDidMount() {
    const animateEnter = Animated.stagger(300, [
      Animated.timing(this.titleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.subtitleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]);
    animateEnter.start();
  }

  handleRetryPress = () => {};
  handleMenuPress = () => {};

  render() {
    const { score } = this.props;
    const titleOpacity = this.titleAnim.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2],
      outputRange: [0, 0.2, 1, 0.2, 0]
    });
    const titleTranslateY = this.titleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });
    const subtitleOpacity = this.subtitleAnim.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2],
      outputRange: [0, 0.2, 1, 0.2, 0]
    });
    const subtitleTranslateY = this.subtitleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });
    return (
      <Animated.View style={styles.container}>
        <Animated.View
          style={{
            transform: [{ translateY: titleTranslateY }],
            opacity: titleOpacity
          }}
        >
          <Text style={styles.title}>Time out.</Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: subtitleTranslateY }],
            opacity: subtitleOpacity
          }}
        >
          <Text style={styles.subtitle}>{`Score: ${score}`}</Text>
        </Animated.View>
        <View style={styles.buttons}>
          <Touchable onPress={this.handleRetryPress}>
            <Animated.Text style={styles.button}>Retry</Animated.Text>
          </Touchable>
          <Touchable onPress={this.handleMenuPress}>
            <Animated.Text style={styles.button}>Menu</Animated.Text>
          </Touchable>
        </View>
      </Animated.View>
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
  title: {
    fontSize: 44,
    color: COLOR_SHUTTLE_GRAY
  },
  subtitle: {
    fontSize: 30,
    color: COLOR_SHUTTLE_GRAY
  },
  buttons: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%"
  },
  button: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: COLOR_SHUTTLE_GRAY,
    fontWeight: "400",
    marginBottom: 30
  }
});
