import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";

const Login = ({ navigation }) => {
  const { inputCnt, txtCnt, messageCnt, messageStyle } = styles;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  const onLoginPress = () => {
    if (!phoneNumber) {
      setMessage(Strings.EMPTY_FIELD_ERROR);
    } else if (!validator.isMobilePhone(phoneNumber)) {
      setMessage(Strings.INVALID_PHONE_NUMEBERـERROR);
    }
  };

  const phoneNumberChangeHandler = text => {
    if (validator.isInt(text) || text === "") {
      setPhoneNumber(text);
    }
  };

  return (
    <Card>
      <View style={inputCnt}>
        <Input
          placeholder={Strings.PHONE_NUMBER}
          leftIcon={{ type: "font-awesome", name: "mobile-phone" }}
          keyboardType="numeric"
          onChangeText={phoneNumberChangeHandler}
          value={phoneNumber}
          maxLength={11}
        />
      </View>
      {message && (
        <View style={messageCnt}>
          <Text style={messageStyle}>{message}</Text>
        </View>
      )}
      <View style={inputCnt}>
        <Button onPress={onLoginPress} title={Strings.LOGIN} />
      </View>

      <TouchableOpacity onPress={onSignUpPress}>
        <View style={txtCnt}>
          <Text>{Strings.REGISTER}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

Login.navigationOptions = {
  headerTitle: Strings.LOGIN
};

const styles = StyleSheet.create({
  inputCnt: {
    marginBottom: 20
  },
  txtCnt: {
    width: "100%",
    alignItems: "center"
  },
  messageCnt: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20
  },
  messageStyle: {
    fontWeight: "700"
  }
});

export default Login;
