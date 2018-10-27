import * as React from "react";
import { Animated, StyleSheet, View, Easing } from "react-native";

interface State {}

type Props = {
  onDone: () => void;
};

export class Interlude extends React.Component<Props, State> {
  titleAnim: Animated.Value = new Animated.Value(0);
  subtitleAnim: Animated.Value = new Animated.Value(0);

  componentDidMount() {
    Animated.stagger(300, [
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
    ]).start(() => this.props.onDone());
  }

  render() {
    const titleOpacity = this.titleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.2, 1]
    });
    const titleTranslateY = this.titleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });
    const subtitleOpacity = this.subtitleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.2, 1]
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
          <Animated.Text style={styles.title}>Well done.</Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [{ translateY: subtitleTranslateY }],
            opacity: subtitleOpacity
          }}
        >
          <Animated.Text style={styles.subtitle}>+5</Animated.Text>
        </Animated.View>
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
    color: "#586069"
  },
  subtitle: {
    fontSize: 30,
    color: "#586069"
  }
});
