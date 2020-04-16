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
  const { recordCnt } = styles;
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
      <Card>
        <View style={recordCnt}>
          <View>
            <Text>{Strings.RECORD}</Text>
          </View>
          <View>
            <Text>{record}</Text>
          </View>
        </View>
        <View style={recordCnt}>
          <View>
            <Text>{Strings.POINT_IN_RECORD}</Text>
          </View>
          <View>
            <Text>{pointInRecord}</Text>
          </View>
        </View>

        <View style={recordCnt}>
          <View>
            <Text>{Strings.CURRENT_POINT}</Text>
          </View>
          <View>
            <Text>{totalPoints}</Text>
          </View>
        </View>
        <View style={recordCnt}>
          <View>
            <Text>{Strings.RANK}</Text>
          </View>
          <View>
            <Text>{rank}</Text>
          </View>
        </View>
        <Button onPress={onStartGamePress} title="شروع بازی" />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  recordCnt: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default Home;
