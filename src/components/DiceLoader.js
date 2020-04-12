import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import diceList from "../utils/dataLists/diceList";
import { useSelector } from "react-redux";

export default ({ maxRoll = 5, onRollingEnd = () => {}, roll = false }) => {
  const { diceCnt } = styles;

  const [currentDiceDimention, setCurrentDiceDimention] = useState(
    diceList[0].image
  );

  var intervalDice;
  useEffect(() => {
    if (roll) {
      setIterval();
    } else {
      clearInterval();
    }
  }, [roll]);

  const setIterval = () => {
    let counter = 1;
    intervalDice = setInterval(() => {
      const x = Math.floor(Math.random() * (5 + 1));
      setCurrentDiceDimention(diceList[x].image);
      if (counter > maxRoll) {
        onRollingEnd(x + 1);
        stopIterval();
      }
      counter++;
    }, 500);
  };
  const stopIterval = () => {
    clearInterval(intervalDice);
  };
  return (
    <View style={diceCnt}>
      <Image
        style={{ width: 100, height: 100 }}
        source={currentDiceDimention}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  diceCnt: {
    backgroundColor: "gray",
    margin: 50,
  },
});
