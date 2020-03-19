import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const { recordCnt } = styles;
  const {
    currentPoint,
    totalPoints,
    rank,
    record,
    pointInRecord
  } = useSelector(state => state.pointInfo);

  const onStartGamePress = () => {
    navigation.push("Game");
  };
  return (
    <View>
      <Card>
        <View style={recordCnt}>
          <View>
            <Text>رکورد:</Text>
          </View>
          <View>
            <Text>{record}</Text>
          </View>
        </View>
        <View style={recordCnt}>
          <View>
            <Text>امتیاز در رکورد فعلی:</Text>
          </View>
          <View>
            <Text>{pointInRecord}</Text>
          </View>
        </View>

        <View style={recordCnt}>
          <View>
            <Text>امتیاز فعلی:</Text>
          </View>
          <View>
            <Text>{currentPoint}</Text>
          </View>
        </View>
        <View style={recordCnt}>
          <View>
            <Text>رتبه</Text>
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
