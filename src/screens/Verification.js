import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Card, Button } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";
import { connect } from "react-redux";
import { setCodeSent } from "../redux/actions";
import { verifyPhoneNumber } from "../redux/actions/api";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onVerifyPress = this.onVerifyPress.bind(this);
    this.state = {
      message: null,
      code: ""
    };
  }
  componentWillUnmount() {
    this.props.dispatch(setCodeSent(false));
  }
  onCodeChange(text) {
    if (validator.isInt(text) || text === "") {
      this.setState(state => ({ ...state, code: text }));
    }
  }
  onVerifyPress() {
    if (this.state.code === "") {
      this.setState(state => ({
        ...state,
        message: Strings.EMPTY_FIELD_ERROR
      }));
    } else {
      this.props.dispatch(
        verifyPhoneNumber(
          this.props.navigation.getParam("phoneNumber"),
          this.state.code
        )
      );
    }
  }
  render() {
    const { message, code } = this.state;

    return (
      <Card>
        <View style={styles.margin}>
          <Input
            keyboardType="numeric"
            value={code}
            onChangeText={this.onCodeChange}
            placeholder={Strings.CODE}
            maxLength={5}
          />
        </View>
        {message && (
          <View style={styles.messageCnt}>
            <Text style={styles.messageStyle}>{message}</Text>
          </View>
        )}
        <Button
          onPress={this.onVerifyPress}
          style={styles.margin}
          title={Strings.VERIFICATION}
        />
      </Card>
    );
  }
}

/* const Verification = () => {
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
}; */

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

export default connect()(Verification);
