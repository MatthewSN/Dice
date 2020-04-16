import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import Strings from "../utils/strings";
import RNTapsellPlus from "react-native-tapsell-plus";
import Keys from "../utils/tapsellKeys";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdAvailable } from "../redux/actions";
import { getPointInfo, logPoint } from "../redux/actions/api";

const Home = ({ navigation }) => {
  const {
    recordCnt,
    container,
    cardTitle,
    numbersStyle,
    numberTitleStyle,
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
    dispatch(getPointInfo());
    navigation.addListener("didFocus", () => {
      dispatch(getPointInfo());
    });
  }, []);

  const onStartGamePress = () => {
    dispatch(setIsAdAvailable(false));
    RNTapsellPlus.requestRewarded(
      Keys.RWARD_AD,
      () => {
        RNTapsellPlus.showAd(
          Keys.RWARD_AD,
          () => {},
          () => {
            navigation.push("Game");
          },
          () => {
            dispatch(logPoint(0));
          },
          () => {
            navigation.push("Game");
          }
        );
      },
      () => {}
    );
  };
  return (
    <View>
      <View style={container}>
        <Card titleStyle={cardTitle} title={Strings.YOUR_POINTS}>
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
    justifyContent: "center",
    width: "100%",
    height: "100%",
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
});

export default Home;
