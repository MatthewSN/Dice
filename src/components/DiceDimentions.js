import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import { Card } from "react-native-elements";

export default ({ onDiceDimentionPress = () => {}, diceDimentions = [] }) => {
  const { selectedItem, unselectedItem } = styles;
  return (
    <FlatList
      data={diceDimentions}
      horizontal={true}
      renderItem={({ item }) => {
        return (
          <Card>
            <TouchableHighlight
              underlayColor="red"
              activeOpacity={0.9}
              onPress={onDiceDimentionPress.bind(this, item.id)}
            >
              <View style={item.isSlected ? selectedItem : unselectedItem}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={item.image}
                />
              </View>
            </TouchableHighlight>
          </Card>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: "blue"
  },
  unselectedItem: {
    backgroundColor: "gray"
  }
});
