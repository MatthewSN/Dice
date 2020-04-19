import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Colors from "../utils/colors";
import GamePlayingStates from "../utils/gamePlayingStates";

export default ({
  onDiceDimentionPress = () => {},
  diceDimentions = [],
  gamePlayingState = GamePlayingStates.PLAYING,
}) => {
  const {
    selectedItem,
    unselectedItem,
    container,
    rightGuessStyle,
    wrongGuessStyle,
    disableStyle,
    flatListContainerStyle,
  } = styles;

  const getDiceStyle = (isSlected) => {
    if (gamePlayingState == GamePlayingStates.PLAYING) {
      return isSlected ? selectedItem : unselectedItem;
    } else if (gamePlayingState === GamePlayingStates.ROLLING) {
      return disableStyle;
    } else {
      return gamePlayingState === GamePlayingStates.WON
        ? rightGuessStyle
        : wrongGuessStyle;
    }
  };

  return (
    <View style={flatListContainerStyle}>
      <FlatList
        data={diceDimentions}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight
              underlayColor="red"
              activeOpacity={0.9}
              style={container}
              onPress={onDiceDimentionPress.bind(this, item.id)}
            >
              <View style={getDiceStyle(item.isSlected)}>
                <Image style={{ width: 80, height: 80 }} source={item.image} />
              </View>
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: Colors.COLOR_BLUE_1,
  },
  unselectedItem: {
    backgroundColor: Colors.COLOR_GRAY_1,
  },
  wrongGuessStyle: {
    backgroundColor: Colors.COLOR_RED_1,
  },
  rightGuessStyle: {
    backgroundColor: Colors.COLOR_GREEN_1,
  },
  disableStyle: {
    backgroundColor: Colors.COLOR_BLACK_1,
  },
  container: {
    margin: 10,
  },
  flatListContainerStyle: {
    alignItems: "center",
  },
});
