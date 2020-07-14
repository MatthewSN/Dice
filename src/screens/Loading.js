import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Colors from "../utils/colors";

export default () => {
  const { container } = styles;
  return (
    <View style={container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.COLOR_RED_2,
    justifyContent: "center",
    alignItems: "center",
  },
});
