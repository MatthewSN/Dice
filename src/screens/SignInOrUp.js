import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Strings from "../utils/strings";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/api";
import Colors from "../utils/colors";
import RegisterCard from "../components/RegisterCard";

const Login = ({ navigation }) => {
  const { containerStyle } = styles;
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

  //Called after clicking the button
  const onSignInOrSignUpPress = () => {
    if (!phoneNumber) {
      setMessage(Strings.EMPTY_FIELD_ERROR);
    } else if (phoneNumber.length < 11 || phoneNumber.substring(0, 2) != "09") {
      setMessage(Strings.INVALID_PHONE_NUMEBERـERROR);
    } else {
      dispatch(login(phoneNumber.substring(1)));
    }
  };

  //Called each time user enters something in the textField
  const onPhoneNumberChanged = (text) => {
    if (validator.isInt(text) || text === "") {
      setPhoneNumber(text);
    }
  };

  return (
    <View style={containerStyle}>
      <RegisterCard
        placeholder={Strings.PHONE_NUMBER}
        rightIcon={{ type: "font-awesome", name: "mobile-phone" }}
        keyboardType="numeric"
        onChangeText={onPhoneNumberChanged}
        value={phoneNumber}
        maxLength={11}
        errorMessage={message}
        onButtonPress={onSignInOrSignUpPress}
        buttonTitle={Strings.LOGIN}
        cardTitle={Strings.LOGIN_EN}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  txtCnt: {
    width: "100%",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: Colors.COLOR_RED_2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default Login;
