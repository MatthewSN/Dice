import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import diceList from "../utils/dataLists/diceList";
import DiceDimentions from "../components/DiceDimentions";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { setIsFetching } from "../redux/actions";
import { logPoint, finishGame } from "../redux/actions/api";
import DiceLoader from "../components/DiceLoader";
import Strings from "../utils/strings";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const Game = ({ navigation }) => {
  const {
    mainCnt,
    section2,
    section1,
    textCnt,
    txt,
    btnCnt,
    scoreSection,
    scoreText,
    scoreCnt,
    buttonTitleStyle,
  } = styles;
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [diceDimentions, setDiceDimentions] = useState(diceList);
  const [selectedItems, setSelectedItems] = useState([]);
  const [roll, setRoll] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(0);
  const { isFetching, points } = useSelector((state) => state.appStatus);

  const dispatch = useDispatch();

  const resetSelectedDices = () => {
    setSelectedItemsCount(0);
    setSelectedItems([]);
    const updatedDiceDimentions = [...diceDimentions];
    updatedDiceDimentions.forEach((dice) => {
      dice.isSlected = false;
    });

    setDiceDimentions(updatedDiceDimentions);
  };

  const onDiceDimentionPress = (id) => {
    const itemIndex = diceDimentions.findIndex((item) => item.id === id);
    const item = diceDimentions[itemIndex];
    let updatedItem = { ...item };
    let updatedSelectedItems = [...selectedItems];
    if (selectedItemsCount < 3 && !item.isSlected) {
      updatedItem = {
        ...item,
        isSlected: true,
      };
      setSelectedItemsCount(selectedItemsCount + 1);
      updatedSelectedItems.push(item.id);
    } else if (item.isSlected) {
      updatedItem = {
        ...item,
        isSlected: false,
      };
      setSelectedItemsCount(selectedItemsCount - 1);
      updatedSelectedItems = selectedItems.filter((id) => id != item.id);
    }
    setSelectedItems(updatedSelectedItems);
    const updatedList = [...diceDimentions];
    updatedList[itemIndex] = updatedItem;

    setDiceDimentions(updatedList);
  };

  const onRollTheDicePress = () => {
    setRoll(true);
  };

  const onRollingEnd = (result = 1) => {
    setRoll(false);
    const resultInSelectedIndex = selectedItems.findIndex(
      (item) => parseInt(item) === result
    );
    if (resultInSelectedIndex == -1) {
      dispatch(logPoint(1));
      goBackToHomeScene();
    } else {
      setCurrentPoint(currentPoint + 1);
      dispatch(logPoint(0));
      openAlertWindow();
    }
    console.log(resultInSelectedIndex);
    console.log(selectedItems);
  };
  const openAlertWindow = () => {
    Alert.alert(
      "؟",
      Strings.WILL_YOU_CONTINUE,
      [
        {
          text: Strings.YES,
          onPress: () => {
            resetSelectedDices();
          },
          style: "cancel",
        },
        {
          text: Strings.FINISHE_THE_GAME,
          onPress: () => {
            endTheGame();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const endTheGame = () => {
    dispatch(finishGame());
    goBackToHomeScene();
  };
  const goBackToHomeScene = () => {
    navigation.pop();
  };
  return (
    <View style={mainCnt}>
      <View style={scoreSection}>
        <View style={scoreCnt}>
          <Text style={scoreText}>
            {Strings.NUMBER_OF_CORRECT_GUESSES}
            {currentPoint}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={section1}>
          <DiceLoader maxRoll={5} roll={roll} onRollingEnd={onRollingEnd} />
          <View style={btnCnt}>
            <Button
              titleStyle={buttonTitleStyle}
              disabled={selectedItemsCount < 3}
              onPress={onRollTheDicePress}
              title={Strings.ROLL_THE_DICE}
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
  header: () => null,
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
    justifyContent: "center",
  },
  section1: {
    width: "100%",
    height: DEVICE_HEIGHT / 2,
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  section2: {
    width: "100%",
    height: DEVICE_HEIGHT / 2,
    minHeight: 320,
  },
  textCnt: {
    alignItems: "center",
  },
  txt: {
    fontWeight: "700",
    fontSize: 30,
    color: "black",
  },
  btnCnt: {
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 1,
    },
    elevation: 5,
    shadowColor: "black",
    width: 200,
  },

  mainCnt: {
    backgroundColor: "#a7334c",
  },
  scoreText: {
    fontWeight: "700",
    fontSize: 20,
  },
  scoreCnt: {
    margin: 20,
  },
  buttonTitleStyle: {
    fontWeight: "700",
    fontSize: 20,
  },
});

export default Game;
