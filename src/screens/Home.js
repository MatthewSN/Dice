import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { useSelector } from "react-redux";
import Strings from "../utils/strings";
import RNTapsellPlus from "react-native-tapsell-plus";
import Keys from "../utils/tapsellKeys";
import { useDispatch } from "react-redux";
import { setIsAdAvailable } from "../redux/actions";

const Home = ({ navigation }) => {
  const { recordCnt } = styles;
  const dispatch = useDispatch();
  const {
    currentPoint,
    totalPoints,
    rank,
    record,
    pointInRecord
  } = useSelector(state => state.pointInfo);

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
            navigation.push("Game");
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
            <Text>{currentPoint}</Text>
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
    marginBottom: 20
  }
});

export default Home;
