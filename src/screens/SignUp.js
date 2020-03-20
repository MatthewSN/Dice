import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";

const SignUp = () => {
  const { inputCnt, messageCnt, messageStyle } = styles;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");

  let nameInput = null;

  const phoneNumberChangeHandler = text => {
    if (validator.isInt(text) || text === "") {
      setPhoneNumber(text);
    }
  };
  const nameChangeHandler = text => {
    setName(text);
  };
  const onSignUpPress = () => {
    if (!phoneNumber || !name) {
      setMessage(Strings.EMPTY_FIELDS_ERROR);
    } else if (!validator.isMobilePhone(phoneNumber)) {
      setMessage(Strings.INVALID_PHONE_NUMEBERـERROR);
    }
  };
  return (
    <Card>
      <View style={inputCnt}>
        <Input
          placeholder={Strings.PHONE_NUMBER}
          leftIcon={{ type: "font-awesome", name: "mobile-phone" }}
          returnKeyType="next"
          onSubmitEditing={event => {
            nameInput.focus();
          }}
          keyboardType="numeric"
          onChangeText={phoneNumberChangeHandler}
          value={phoneNumber}
          maxLength={11}
        />
      </View>
      <View style={inputCnt}>
        <Input
          ref={input => {
            nameInput = input;
          }}
          placeholder={Strings.NAME}
          leftIcon={{ type: "font-awesome", name: "user" }}
          value={name}
          onChangeText={nameChangeHandler}
        />
      </View>
      {message && (
        <View style={messageCnt}>
          <Text style={messageStyle}>{message}</Text>
        </View>
      )}
      <View style={inputCnt}>
        <Button onPress={onSignUpPress} title={Strings.REGISTER} />
      </View>
    </Card>
  );
};

SignUp.navigationOptions = {
  headerTitle: Strings.REGISTER
};

const styles = StyleSheet.create({
  inputCnt: {
    marginBottom: 20
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

export default SignUp;
