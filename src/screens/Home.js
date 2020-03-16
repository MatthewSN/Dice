import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

const Home = () => {
  const { recordCnt } = styles;
  return (
    <View>
      <Card>
        <View style={recordCnt}>
          <View>
            <Text>رکورد:</Text>
          </View>
          <View>
            <Text>0</Text>
          </View>
        </View>
        <View style={recordCnt}>
          <View>
            <Text>امتیاز در رکورد فعلی:</Text>
          </View>
          <View>
            <Text>0</Text>
          </View>
        </View>

        <View style={recordCnt}>
          <View>
            <Text>امتیاز فعلی:</Text>
          </View>
          <View>
            <Text>0</Text>
          </View>
        </View>
        <View style={recordCnt}>
          <View>
            <Text>رتبه</Text>
          </View>
          <View>
            <Text>0</Text>
          </View>
        </View>
        <Button title="شروع بازی" />
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
