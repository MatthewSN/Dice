import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, BackHandler } from "react-native";
import diceList from "../utils/dataLists/diceList";
import GamePlayingStates from "../utils/gamePlayingStates";
import Colors from "../utils/colors";

export default ({
  maxRoll = 5,
  onRollingEnd = () => {},
  roll = false,
  gamePlayingStates = GamePlayingStates.PLAYING,
}) => {
  const { defaultDiceColorStyle, wrongGuessStyle, rightGuessStyle } = styles;

  const [currentDiceDimention, setCurrentDiceDimention] = useState(
    diceList[0].image
  );
  const [diceColorStyle, setDiceColorStyle] = useState(defaultDiceColorStyle);
  const [intervalDice, setItervalDice] = useState();

  useEffect(() => {
    console.log(roll, gamePlayingStates);
    if (roll) {
      setIterval();
    } else {
      stopIterval();
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
    setItervalDice(setInterval(() => {
      const x = Math.floor(Math.random() * (5 + 1));
      setCurrentDiceDimention(diceList[x].image);
      if (counter > maxRoll) {
        onRollingEnd(x + 1);
        stopIterval();
      }
      counter++;
    }, 500));
  };
  const stopIterval = () => {
    console.log("stop it", intervalDice);
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
    margin: 50,
  },
  rightGuessStyle: {
    backgroundColor: Colors.COLOR_GREEN_1,
    margin: 50,
  },
});
