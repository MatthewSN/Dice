import React from "react";
import { View, Text, PanResponder } from "react-native";

class Dice extends React.Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
  }
  handlePanResponderMove(e, gestureState) {
    const { dx, dy } = gestureState;
    const y = `${dx}deg`;
    const x = `${-dy}deg`;
    this.refView.setNativeProps({
      style: {
        transform: [{ perspective: 1000 }, { rotateX: x }, { rotateY: y }]
      }
    });
  }
  rotateXY(dx, dy) {
  const radX = (Math.PI / 180) * dy;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);

  const radY = (Math.PI / 180) * -dx;
  const cosY= Math.cos(radY);
  const sinY = Math.sin(radY);

  return [
    cosY, sinX * sinY, cosX * sinY, 0,
    0, cosX, -sinX, 0,
    -sinY, cosY * sinX, cosX * cosY, 0,
    0, 0, 0, 1
  ];
}
  
  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <View
          ref={component => (this.refView = component)}
          style={styles.rotateView}
        />
      </View>
    );
  }
}



const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rotateView: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.2
  }
};

export default Dice;
