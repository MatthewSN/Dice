import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import diceList from "../utils/dataLists/diceList";
import { useSelector } from "react-redux";
import GamePlayingStates from "../utils/gamePlayingStates";
import Colors from "../utils/colors";

export default ({
  maxRoll = 5,
  onRollingEnd = () => {},
  roll = false,
  gamePlayingStates = GamePlayingStates.PLAYING,
}) => {
  const {
    diceCnt,
    defaultDiceColorStyle,
    wrongGuessStyle,
    rightGuessStyle,
  } = styles;

  const [currentDiceDimention, setCurrentDiceDimention] = useState(
    diceList[0].image
  );
  const [diceColorStyle, setDiceColorStyle] = useState(defaultDiceColorStyle);

  var intervalDice;
  useEffect(() => {
    if (roll) {
      setIterval();
    } else {
      clearInterval();
    }
    if (gamePlayingStates === GamePlayingStates.PLAYING) {
      setDiceColorStyle(defaultDiceColorStyle);
    } else if (gamePlayingStates === GamePlayingStates.WON) {
      setDiceColorStyle(rightGuessStyle);
    } else if (gamePlayingStates === GamePlayingStates.LOST) {
      setDiceColorStyle(wrongGuessStyle);
    }
  }, [roll, gamePlayingStates]);

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
    <View style={diceColorStyle}>
      <Image
        style={{ width: 100, height: 100 }}
        source={currentDiceDimention}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultDiceColorStyle: {
    backgroundColor: "gray",
    margin: 50,
  },
  wrongGuessStyle: {
    backgroundColor: Colors.COLOR_RED_1,
  },
  rightGuessStyle: {
    backgroundColor: Colors.COLOR_GREEN_1,
  },
});
