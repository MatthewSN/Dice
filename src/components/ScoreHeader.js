import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default ({ title, score }) => {
  const { scoreHeader, scoreText, scoreCnt } = styles;
  return (
    <View style={scoreHeader}>
      <View style={scoreCnt}>
        <Text style={scoreText}>
          {title}
          {score}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreHeader: {
    width: "100%",
    height: 50,
    backgroundColor: "#ccd1e3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: "center",
  },
  scoreText: {
    fontWeight: "700",
    fontSize: 20,
  },
  scoreCnt: {
    margin: 20,
  },
});
