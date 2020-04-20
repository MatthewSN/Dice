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
import GamePlayingStates from "../utils/gamePlayingStates";
import Colors from "../utils/colors";
import ScoreHeader from "../components/ScoreHeader";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const Game = ({ navigation }) => {
  const {
    mainCnt,
    section2,
    section1,
    textCnt,
    txt,
    btnCnt,
    buttonTitleStyle,
  } = styles;
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [diceDimentions, setDiceDimentions] = useState(diceList);
  const [selectedItems, setSelectedItems] = useState([]);
  const [roll, setRoll] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [gamePlayingState, setGamePlayingState] = useState(
    GamePlayingStates.PLAYING
  );

  const dispatch = useDispatch();

  const resetSelectedDices = () => {
    setSelectedItemsCount(0);
    setSelectedItems([]);
    const updatedDiceDimentions = [...diceDimentions];
    updatedDiceDimentions.forEach((dice) => {
      dice.isSlected = false;
    });
    setGamePlayingState(GamePlayingStates.PLAYING);
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
    setGamePlayingState(GamePlayingStates.ROLLING);
  };

  const onRollingEnd = (result = 1) => {
    setRoll(false);
    const resultInSelectedIndex = selectedItems.findIndex(
      (item) => parseInt(item) === result
    );
    if (resultInSelectedIndex == -1) {
      dispatch(logPoint(1));
      setGamePlayingState(GamePlayingStates.LOST);
      leaveToScoresScreen();
    } else {
      setCurrentPoint(currentPoint + 1);
      setGamePlayingState(GamePlayingStates.WON);
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
            sumbitResultForGettingPoints();
            leaveToScoresScreen();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const leaveToScoresScreen = () => {
    navigation.replace("Scores");
  };
  //Getting score in winnig state
  const sumbitResultForGettingPoints = () => {
    dispatch(finishGame());
  };

  //if there is any more than one screen left pop the screen
  closeThisScreen = () => {
    navigation.pop();
  };
  return (
    <View style={mainCnt}>
      <ScoreHeader
        title={Strings.NUMBER_OF_CORRECT_GUESSES}
        score={currentPoint}
      />

      <View style={section1}>
        <DiceLoader
          gamePlayingStates={gamePlayingState}
          maxRoll={5}
          roll={roll}
          onRollingEnd={onRollingEnd}
        />
        <View style={btnCnt}>
          <Button
            titleStyle={buttonTitleStyle}
            disabled={selectedItemsCount < 3}
            onPress={onRollTheDicePress}
            title={Strings.ROLL_THE_DICE}
          />
        </View>
      </View>

      <View
        pointerEvents={
          gamePlayingState !== GamePlayingStates.PLAYING ? "none" : "auto"
        }
        style={section2}
      >
        <View style={textCnt}>
          <Text style={txt}>{Strings.CHOOSE_THREE_DIMENTIONS} </Text>
        </View>
        <View>
          <DiceDimentions
            onDiceDimentionPress={onDiceDimentionPress}
            gamePlayingState={gamePlayingState}
            diceDimentions={diceDimentions}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.COLOR_RED_2,
    alignItems: "center",
  },
  buttonTitleStyle: {
    fontWeight: "700",
    fontSize: 20,
  },
});

export default Game;
