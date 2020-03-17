import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import diceList from "../utils/dataLists/diceList";
import DiceDimentions from "../components/DiceDimentions";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const Game = () => {
  const { section2, section1, textCnt, txt } = styles;
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [diceDimentions, setDiceDimentions] = useState(diceList);
  const [selectedItems, setSelectedItems] = useState([]);

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

  return (
    <View>
      <ScrollView>
        <View style={section1}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../assets/drawable/dice1.png")}
          />
        </View>
        <View style={section2}>
          <View style={textCnt}>
            <Text style={txt}>سه وجه را انتخاب کنید</Text>
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

const styles = StyleSheet.create({
  section1: {
    width: "100%",
    height: DEVICE_HEIGHT / 3,
    minHeight: 213,
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
    fontSize: 30
  }
});

export default Game;
