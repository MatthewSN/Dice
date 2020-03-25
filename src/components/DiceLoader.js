import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Animated,
  ActivityIndicator
} from "react-native";
import diceList from "../utils/dataLists/diceList";
import { useSelector } from "react-redux";

export default () => {
  const { diceCnt } = styles;
  const [currentDiceDimention, setCurrentDiceDimention] = useState(
    diceList[0].image
  );
  const { isFetching } = useSelector(state => state.appStatus);
  var intervalDice;
  useEffect(() => {
    if (isFetching) {
      intervalDice = setInterval(() => {
        const x = Math.floor(Math.random() * (5 + 1));
        setCurrentDiceDimention(diceList[x].image);
      }, 500);
    } else {
      clearInterval(intervalDice);
    }
  }, [isFetching]);

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
    margin: 50
  }
});
