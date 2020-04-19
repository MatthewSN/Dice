import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/actions/api";
import Colors from "../utils/colors";

const SignUp = ({ navigation }) => {
  const {
    inputCnt,
    messageCnt,
    messageStyle,
    containerStyle,
    cardContainerStyle,
  } = styles;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { codeSent } = useSelector((state) => state.appStatus);

  let nameInput = null;

  useEffect(() => {
    if (codeSent) {
      navigation.navigate("Verification", { phoneNumber });
    }
  }, [codeSent]);

  const phoneNumberChangeHandler = (text) => {
    if (validator.isInt(text) || text === "") {
      setPhoneNumber(text);
    }
  };
  const nameChangeHandler = (text) => {
    setName(text);
  };
  const onSignUpPress = () => {
    if (!phoneNumber || !name) {
      setMessage(Strings.EMPTY_FIELDS_ERROR);
    } else if (!validator.isMobilePhone(phoneNumber)) {
      setMessage(Strings.INVALID_PHONE_NUMEBERـERROR);
    } else {
      dispatch(signUp(name, phoneNumber));
    }
  };
  return (
    <View style={containerStyle}>
      <Card title="Sign up" containerStyle={cardContainerStyle}>
        <View style={inputCnt}>
          <Input
            placeholder={Strings.PHONE_NUMBER}
            rightIcon={{ type: "font-awesome", name: "mobile-phone" }}
            returnKeyType="next"
            onSubmitEditing={(event) => {
              nameInput.focus();
            }}
            keyboardType="numeric"
            onChangeText={phoneNumberChangeHandler}
            value={phoneNumber}
            maxLength={10}
          />
        </View>
        <View style={inputCnt}>
          <Input
            ref={(input) => {
              nameInput = input;
            }}
            placeholder={Strings.NAME}
            rightIcon={{ type: "font-awesome", name: "user" }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputCnt: {
    marginBottom: 20,
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

export default SignUp;
