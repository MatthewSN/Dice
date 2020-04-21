import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Card, Button } from "react-native-elements";

import Colors from "../utils/colors";

export default (props) => {
  const { containerStyle, cardContainerStyle } = styles;
  const {
    buttonTitle = "Untitled",
    onButtonPress,
    cardTitle,
    children,
  } = props;

  //Rendering a Card that has a text input and a button
  const CustomizedCard = () => {
    return (
      <Card title={cardTitle} containerStyle={cardContainerStyle}>
        <View style={styles.margin}>
          <Input {...props} />
        </View>

        <Button
          onPress={onButtonPress}
          style={styles.margin}
          title={buttonTitle}
        />
        {children}
      </Card>
    );
  };
  return <View style={containerStyle}>{CustomizedCard()}</View>;
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 30,
  },
  messageCnt: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  messageStyle: {
    fontWeight: "700",
  },
  containerStyle: {
    backgroundColor: Colors.COLOR_RED_2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  cardContainerStyle: {
    backgroundColor: Colors.COLOR_GRAY_1,
  },
});
