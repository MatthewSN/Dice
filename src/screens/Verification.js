import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Card, Button } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";

const Verification = () => {
  const [code, setCode] = useState("");
  const [message, setMassage] = useState(null);
  const { margin, messageCnt, messageStyle } = styles;

  const onCodeChange = text => {
    if (validator.isInt(text) || text === "") {
      setCode(text);
    }
  };
  const onVerifyPress = () => {
    if (code === "") {
      setMassage(Strings.EMPTY_FIELD_ERROR);
    }
  };
  return (
    <Card>
      <View style={margin}>
        <Input
          keyboardType="numeric"
          value={code}
          onChangeText={onCodeChange}
          placeholder={Strings.CODE}
          maxLength={5}
        />
      </View>
      {message && (
        <View style={messageCnt}>
          <Text style={messageStyle}>{message}</Text>
        </View>
      )}
      <Button
        onPress={onVerifyPress}
        style={margin}
        title={Strings.VERIFICATION}
      />
    </Card>
  );
};

Verification.navigationOptions = {
  headerTitle: Strings.VERIFICATION
};

const styles = StyleSheet.create({
  margin: {
    marginBottom: 30
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

export default Verification;
