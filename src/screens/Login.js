import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/api";
import Colors from "../utils/colors";

const Login = ({ navigation }) => {
  const {
    inputCnt,
    txtCnt,
    messageCnt,
    messageStyle,
    containerStyle,
    cardContainerStyle,
  } = styles;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const { codeSent } = useSelector((state) => state.appStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeSent) {
      navigation.navigate("Verification", {
        phoneNumber: phoneNumber.substring(1),
      });
    }
  }, [codeSent]);

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  const onLoginPress = () => {
    if (!phoneNumber) {
      setMessage(Strings.EMPTY_FIELD_ERROR);
    } else if (phoneNumber.length < 11 || phoneNumber.substring(0, 2) != "09") {
      setMessage(Strings.INVALID_PHONE_NUMEBERـERROR);
    } else {
      dispatch(login(phoneNumber.substring(1)));
    }
  };

  const phoneNumberChangeHandler = (text) => {
    if (validator.isInt(text) || text === "") {
      setPhoneNumber(text);
    }
  };

  return (
    <View style={containerStyle}>
      <Card title="Login" containerStyle={cardContainerStyle}>
        <View style={inputCnt}>
          <Input
            placeholder={Strings.PHONE_NUMBER}
            rightIcon={{ type: "font-awesome", name: "mobile-phone" }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputCnt: {
    marginBottom: 20,
  },
  txtCnt: {
    width: "100%",
    alignItems: "center",
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

export default Login;
