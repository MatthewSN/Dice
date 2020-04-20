import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import Strings from "../utils/strings";
import RNTapsellPlus from "react-native-tapsell-plus";
import Keys from "../utils/tapsellKeys";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdAvailable } from "../redux/actions";
import { getPointInfo, logPoint } from "../redux/actions/api";
import Colors from "../utils/colors";
import ScoreHeader from "../components/ScoreHeader";

const Home = ({ navigation }) => {
  const {
    recordCnt,
    container,
    cardTitle,
    numbersStyle,
    numberTitleStyle,
    cardContainerStyle,
    cardViewContainerStyle,
    refreshButtonContainerStyle,
  } = styles;
  const dispatch = useDispatch();
  const {
    currentPoint,
    totalPoints,
    rank,
    record,
    pointInRecord,
  } = useSelector((state) => {
    return state.pointsInfo;
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getPointInfo());
    });

    return unsubscribe;
  }, [navigation]);

  const onStartGamePress = () => {
    dispatch(setIsAdAvailable(false));
    navigation.navigate("Game");
  };
  const onRefreshPress = () => {
    dispatch(getPointInfo());
  };
  return (
    <View>
      <View style={container}>
        <ScoreHeader title={Strings.TOTAL_POINT} score={totalPoints} />
        <View style={cardViewContainerStyle}>
          <Card
            containerStyle={cardContainerStyle}
            titleStyle={cardTitle}
            title={Strings.YOUR_POINTS}
          >
            <View style={recordCnt}>
              <View>
                <Text style={numberTitleStyle}>{Strings.RECORD}</Text>
              </View>
              <View>
                <Text style={numbersStyle}>{record}</Text>
              </View>
            </View>
            <View style={recordCnt}>
              <View>
                <Text style={numberTitleStyle}>{Strings.POINT_IN_RECORD}</Text>
              </View>
              <View>
                <Text style={numbersStyle}>{pointInRecord}</Text>
              </View>
            </View>

            <View style={recordCnt}>
              <View>
                <Text style={numberTitleStyle}>{Strings.CURRENT_POINT}</Text>
              </View>
              <View>
                <Text style={numbersStyle}>{currentPoint}</Text>
              </View>
            </View>
            <View style={recordCnt}>
              <View>
                <Text style={numberTitleStyle}>{Strings.RANK}</Text>
              </View>
              <View>
                <Text style={numbersStyle}>{rank}</Text>
              </View>
            </View>
            <Button onPress={onStartGamePress} title={Strings.START_THE_GAME} />
          </Card>
        </View>
        <View style={refreshButtonContainerStyle}>
          <Button onPress={onRefreshPress} title={Strings.REFRESH} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recordCnt: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.COLOR_RED_2,
  },
  cardContainerStyle: {
    backgroundColor: Colors.COLOR_GRAY_1,
  },
  cardTitle: {
    fontSize: 20,
  },
  numbersStyle: {
    fontSize: 20,
    fontWeight: "500",
  },
  numberTitleStyle: {
    fontSize: 15,
    fontWeight: "700",
  },

  cardViewContainerStyle: {
    margin: 25,
  },
  refreshButtonContainerStyle: {
    alignItems: "center",
  },
});

export default Home;
