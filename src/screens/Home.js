import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Card, Button } from "react-native-elements";
import Strings from "../utils/strings";
import RNTapsellPlus from "react-native-tapsell-plus";
import Keys from "../utils/tapsellKeys";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdAvailable } from "../redux/actions";
import { getPointInfo, logPoint, finishGame } from "../redux/actions/api";
import Colors from "../utils/colors";
import ScoreHeader from "../components/ScoreHeader";

const Home = ({ navigation }) => {
  const [isAdAvailable, setIsAdAvailable] = useState(false);
  const dispatch = useDispatch();

  const {
    cardContainerStyle,
    containerStyle,
    buttonContainerStyle,
    cardOuterContainerStyle,
  } = styles;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      requestForAd();
    });

    return unsubscribe;
  }, [navigation]);

  const onStartGamePress = () => {
    navigation.navigate("Game");
  };

  const onSocresButtonPress = () => {
    navigation.navigate("Scores");
  };
  const onIncreaseScoreButtonPress = () => {
    if (isAdAvailable) {
      showAd();
      setIsAdAvailable(false);
    } else {
      ToastAndroid.show(Strings.AD_IS_NOT_AVAILABLE, ToastAndroid.SHORT);
    }
  };

  const requestForAd = () => {
    RNTapsellPlus.requestRewarded(
      Keys.RWARD_AD,
      () => {
        setIsAdAvailable(true);
      },
      () => {}
    );
  };
  /*showing the ad :
  1-Adding point if user watched till the end
  2-navigating to the Scores scene to see the result
  */
  const showAd = () => {
    RNTapsellPlus.showAd(
      Keys.RWARD_AD,
      () => {},
      () => {},
      () => {
        dispatch(logPoint(0));
        dispatch(finishGame());
        navigation.navigate("Scores");
      },
      () => {}
    );
  };

  return (
    <View style={containerStyle}>
      <View style={cardOuterContainerStyle}>
        <Card containerStyle={cardContainerStyle}>
          <View style={buttonContainerStyle}>
            <Button onPress={onStartGamePress} title={Strings.START_THE_GAME} />
          </View>
          <View style={buttonContainerStyle}>
            <Button onPress={onSocresButtonPress} title={Strings.SCORES} />
          </View>
          <View style={buttonContainerStyle}>
            <Button
              onPress={onIncreaseScoreButtonPress}
              title={Strings.INCREASE_POINT}
            />
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.COLOR_RED_2,
  },
  cardContainerStyle: {
    backgroundColor: Colors.COLOR_GRAY_1,
  },
  buttonContainerStyle: {
    margin: 15,
  },
  cardOuterContainerStyle: {
    margin: 25,
  },
});

export default Home;
