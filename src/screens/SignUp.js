import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Input } from "react-native-elements";

const SignUp = () => {
  const { inputCnt, txtCnt } = styles;
  return (
    <Card>
      <View style={inputCnt}>
        <Input
          placeholder="Phone Number"
          leftIcon={{ type: "font-awesome", name: "mobile-phone" }}
        />
      </View>
      <View style={inputCnt}>
        <Input
          placeholder="Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
        />
      </View>
      <View style={inputCnt}>
        <Button title="ورود" />
      </View>

      <TouchableOpacity>
        <View style={txtCnt}>
          <Text>ثبت نام</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  inputCnt: {
    marginBottom: 20
  },
  txtCnt: {
    width: "100%",
    alignItems: "center"
  }
});

export default SignUp;
