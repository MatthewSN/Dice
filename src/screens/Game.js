import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableHighlight
} from "react-native";
import { Card } from "react-native-elements";
import diceList from "../utils/dataLists/diceList";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const Game = () => {
  const { section2, section1, textCnt, selectedItem, unselectedItem } = styles;
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [dicePngs, setDicePngs] = useState(diceList);

  const onItemDicePress = id => {
    const itemIndex = dicePngs.findIndex(item => item.id === id);
    const item = dicePngs[itemIndex];
    let updatedItem = { ...item };
    if (selectedItemsCount < 3 && !item.isSlected) {
      updatedItem = {
        ...item,
        isSlected: true
      };
      setSelectedItemsCount(selectedItemsCount + 1);
    } else if (item.isSlected) {
      updatedItem = {
        ...item,
        isSlected: false
      };
      setSelectedItemsCount(selectedItemsCount - 1);
    }

    const updatedList = [...dicePngs];
    updatedList[itemIndex] = updatedItem;
    setDicePngs(updatedList);
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
            <Text>سه وجه را انتخاب کنید</Text>
          </View>
          <View>
            <FlatList
              data={dicePngs}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <Card>
                    <TouchableHighlight
                      underlayColor="red"
                      activeOpacity={0.9}
                      onPress={onItemDicePress.bind(this, item.id)}
                    >
                      <View
                        style={item.isSlected ? selectedItem : unselectedItem}
                      >
                        <Image
                          style={{ width: 100, height: 100 }}
                          source={item.image}
                        />
                      </View>
                    </TouchableHighlight>
                  </Card>
                );
              }}
              keyExtractor={item => item.id}
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
  imageCnt1: {},
  textCnt: {
    alignItems: "center"
  },
  selectedItem: {
    backgroundColor: "blue"
  },
  unselectedItem: {
    backgroundColor: "gray"
  }
});

export default Game;
