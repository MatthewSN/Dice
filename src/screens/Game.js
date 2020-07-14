import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
} from "react-native";
import diceList from "../utils/dataLists/diceList";
import DiceDimentions from "../components/DiceDimentions";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { setIsFetching, setGamePlayingState } from "../redux/actions";
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
  const [selectedDimensionsCount, setSelectedItemsCount] = useState(0);
  const [diceDimensions, setDiceDimensions] = useState(diceList);
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(0);
  const { pointInRecord } = useSelector((state) => {
    return state.pointsInfo;
  });
  const dispatch = useDispatch();
  const { gamePlayingState } = useSelector((state) => state.appStatus);
  useEffect(() => {
    if (pointInRecord === 0) {
    }
    changeGamePlayingState(GamePlayingStates.PLAYING);
    BackHandler.addEventListener("hardwareBackPress", () => {
      changeGamePlayingState(GamePlayingStates.NOT_PLAYING);
    });
  }, []);

  const openCantPlayAlertWindow = () => {
    Alert.alert(
      "!!",
      Strings.YOU_LOST,
      [
        {
          text: Strings.TRY_AGAIN,
          onPress: () => {
            resetForNewGame();
          },
          style: "cancel",
        },
        {
          text: Strings.SHOW_SCORES,
          onPress: () => {
            leaveToScoresScreen();
          },
        },
      ],
      { cancelable: false }
    );
  };

  //Handeling setting the game state dispatch
  const changeGamePlayingState = (newState = GamePlayingStates.PLAYING) => {
    dispatch(setGamePlayingState(newState));
  };

  //Reseting the game related states when user decides to continue
  const resetForNewThrow = () => {
    setSelectedItemsCount(0);
    setSelectedDimensions([]);
    const updatedDiceDimentions = [...diceDimensions];
    updatedDiceDimentions.forEach((dice) => {
      dice.isSlected = false;
    });
    changeGamePlayingState(GamePlayingStates.PLAYING);
    setDiceDimensions(updatedDiceDimentions);
  };
  //Reseting the game states for a new game
  const resetForNewGame = () => {
    resetForNewThrow();
    setCurrentPoint(0);
  };

  //Check if we could select a dimensioin or not
  const canSelect = (dimension = {}) => {
    if (selectedDimensionsCount < 3 && !dimension.isSlected) return true;
    return false;
  };

  //Select or diselect a dimension
  const toggleDimension = (dimension, demensionIndex, isSlected) => {
    let updatedDimension = { ...dimension };
    let updatedSelectedItems = [...selectedDimensions];
    updatedDimension = {
      ...dimension,
      isSlected: isSlected,
    };
    if (isSlected) {
      setSelectedItemsCount(selectedDimensionsCount + 1);
      updatedSelectedItems.push(dimension.id);
    } else {
      setSelectedItemsCount(selectedDimensionsCount - 1);
      updatedSelectedItems = selectedDimensions.filter(
        (id) => id != dimension.id
      );
    }
    setSelectedDimensions(updatedSelectedItems);
    const updatedDiceDimensions = [...diceDimensions];
    updatedDiceDimensions[demensionIndex] = updatedDimension;
    setDiceDimensions(updatedDiceDimensions);
  };

  //When pressed on one of the dimensions this method controls whether the mentioned
  //dimension should be selected or not
  const onDiceDimentionPress = (id) => {
    const demensionIndex = diceDimensions.findIndex((item) => item.id === id);
    const pressedDimension = diceDimensions[demensionIndex];
    if (canSelect(pressedDimension)) {
      toggleDimension(pressedDimension, demensionIndex, true);
    } else if (pressedDimension.isSlected) {
      toggleDimension(pressedDimension, demensionIndex, false);
    }
  };

  //Change the Game State to Rolling
  const onRollTheDicePress = () => {
    changeGamePlayingState(GamePlayingStates.ROLLING);
  };

  //Check wheather player is lost or not
  const didLost = (diceDimensionResult = 0) => {
    const resultInSelectedIndex = selectedDimensions.findIndex(
      (item) => parseInt(item) === diceDimensionResult
    );
    if (resultInSelectedIndex == -1) return true;
    return false;
  };

  //Called when guess was wrong
  const onGameLost = () => {
    dispatch(logPoint(1));
    changeGamePlayingState(GamePlayingStates.LOST);
    openLostAlertWindow();
  };

  //Called when guess was right
  const onPointGained = () => {
    setCurrentPoint(currentPoint + 1);
    changeGamePlayingState(GamePlayingStates.WON);
    dispatch(logPoint(0));
    openAlertWindow();
  };

  //Called after dice rolling has ended(Called in DiceLoader component)
  const onRollingEnd = (diceDimensionResult = 1) => {
    const resultInSelectedIndex = selectedDimensions.findIndex(
      (item) => parseInt(item) === diceDimensionResult
    );
    const lostGame = didLost(diceDimensionResult);
    if (lostGame) {
      onGameLost();
    } else {
      onPointGained();
    }
  };

  //Giving options for continuing or finishing the game(Called after some points has gained)
  const openAlertWindow = () => {
    Alert.alert(
      "؟",
      Strings.WILL_YOU_CONTINUE,
      [
        {
          text: Strings.YES,
          onPress: () => {
            resetForNewThrow();
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

  const openLostAlertWindow = () => {
    Alert.alert(
      "!!",
      Strings.YOU_LOST,
      [
        {
          text: Strings.TRY_AGAIN,
          onPress: () => {
            resetForNewGame();
          },
          style: "cancel",
        },
        {
          text: Strings.SHOW_SCORES,
          onPress: () => {
            leaveToScoresScreen();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const leaveToScoresScreen = () => {
    navigation.replace("RetryAndScores");
  };
  //Getting score in winnig state
  const sumbitResultForGettingPoints = () => {
    dispatch(finishGame());
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
          roll={gamePlayingState === GamePlayingStates.ROLLING ? true : false}
          onRollingEnd={onRollingEnd}
        />
        <View style={btnCnt}>
          <Button
            titleStyle={buttonTitleStyle}
            disabled={selectedDimensionsCount < 3}
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
            diceDimentions={diceDimensions}
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
