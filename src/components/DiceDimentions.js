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
  const { selectedItem, unselectedItem, container } = styles;
  return (
    <FlatList
      data={diceDimentions}
      horizontal={true}
      renderItem={({ item }) => {
        return (
          <TouchableHighlight
            underlayColor="red"
            activeOpacity={0.9}
            style={container}
            onPress={onDiceDimentionPress.bind(this, item.id)}
            
          >
            <View style={item.isSlected ? selectedItem : unselectedItem}>
              <Image style={{ width: 100, height: 100 }} source={item.image} />
            </View>
          </TouchableHighlight>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: "#718cf2"
  },
  unselectedItem: {
    backgroundColor: "#ccd1e3"
  },
  container: {
    margin: 10
  }
});
