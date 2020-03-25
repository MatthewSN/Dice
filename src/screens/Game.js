import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import diceList from "../utils/dataLists/diceList";
import DiceDimentions from "../components/DiceDimentions";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { setIsFetching } from "../redux/actions";
import { getPoint } from "../redux/actions/api";
import DiceLoader from "../components/DiceLoader";
import Strings from "../utils/strings";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const Game = () => {
  const {
    mainCnt,
    section2,
    section1,
    textCnt,
    txt,
    btnCnt,
    scoreSection,
    scoreText,
    scoreCnt
  } = styles;
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [diceDimentions, setDiceDimentions] = useState(diceList);
  const [selectedItems, setSelectedItems] = useState([]);
  const { isFetching, points } = useSelector(state => state.appStatus);
  const { currentPoint } = useSelector(state => state.pointsInfo);
  const dispatch = useDispatch();

  const onDiceDimentionPress = id => {
    const itemIndex = diceDimentions.findIndex(item => item.id === id);
    const item = diceDimentions[itemIndex];
    let updatedItem = { ...item };
    let updatedSelectedItems = [...selectedItems];
    if (selectedItemsCount < 3 && !item.isSlected) {
      updatedItem = {
        ...item,
        isSlected: true
      };
      setSelectedItemsCount(selectedItemsCount + 1);
      updatedSelectedItems.push(item.id);
    } else if (item.isSlected) {
      updatedItem = {
        ...item,
        isSlected: false
      };
      setSelectedItemsCount(selectedItemsCount - 1);
      updatedSelectedItems = selectedItems.filter(id => id != item.id);
    }
    setSelectedItems(updatedSelectedItems);
    console.log(updatedSelectedItems);
    const updatedList = [...diceDimentions];
    updatedList[itemIndex] = updatedItem;

    setDiceDimentions(updatedList);
  };

  const onRollTheDicePress = () => {
    dispatch(getPoint());
    dispatch(setIsFetching(!isFetching));
  };

  return (
    <View style={mainCnt}>
      <View style={scoreSection}>
        <View style={scoreCnt}>
          <Text style={scoreText}>
            {Strings.SCORE}
            {currentPoint}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={section1}>
          <DiceLoader />
          <View style={btnCnt}>
            <Button
              disabled={
                selectedItemsCount === 3 && isFetching == false ? false : true
              }
              onPress={onRollTheDicePress}
              title="انداختن تاس"
            />
          </View>
        </View>

        <View pointerEvents={isFetching ? "none" : "auto"} style={section2}>
          <View style={textCnt}>
            <Text style={txt}>{Strings.CHOOSE_THREE_DIMENTIONS} </Text>
          </View>
          <View>
            <DiceDimentions
              onDiceDimentionPress={onDiceDimentionPress}
              diceDimentions={diceDimentions}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

Game.navigationOptions = {
  header: () => null
};

const styles = StyleSheet.create({
  scoreSection: {
    width: "100%",
    height: 50,
    backgroundColor: "#ccd1e3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    justifyContent: "center"
  },
  section1: {
    width: "100%",
    height: DEVICE_HEIGHT / 2,
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center"
  },
  section2: {
    width: "100%",
    height: DEVICE_HEIGHT / 2,
    minHeight: 320
  },
  textCnt: {
    alignItems: "center"
  },
  txt: {
    fontWeight: "700",
    fontSize: 30,
    color: "black"
  },
  btnCnt: {
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 1
    },
    elevation: 5,
    shadowColor: "black",
    width: 200
  },

  mainCnt: {
    backgroundColor: "#a7334c"
  },
  scoreText: {
    fontWeight: "700",
    fontSize: 20
  },
  scoreCnt: {
    margin: 20
  }
});

export default Game;
