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
    cardContainerStyle,
    containerStyle,
    buttonContainerStyle,
    cardOuterContainerStyle,
  } = styles;
  return (
    <View style={containerStyle}>
      <View style={cardOuterContainerStyle}>
        <Card containerStyle={cardContainerStyle}>
          <View style={buttonContainerStyle}>
            <Button title={Strings.SCORES} />
          </View>
          <View style={buttonContainerStyle}>
            <Button title={Strings.INCREASE_POINT} />
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
