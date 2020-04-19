import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Card, Button } from "react-native-elements";
import Strings from "../utils/strings";
import validator from "validator";
import { connect } from "react-redux";
import { setCodeSent } from "../redux/actions";
import { verifyPhoneNumber } from "../redux/actions/api";
import Colors from "../utils/colors";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onVerifyPress = this.onVerifyPress.bind(this);
    this.state = {
      message: null,
      code: "",
    };
  }
  componentWillUnmount() {
    this.props.dispatch(setCodeSent(false));
  }
  componentDidMount() {
    this.redirectToHomeScene();
  }
  componentDidUpdate() {
    this.redirectToHomeScene();
  }
  redirectToHomeScene() {
    if (this.props.token) {
      this.props.navigation.navigate("Home");
    }
  }
  onCodeChange(text) {
    if (validator.isInt(text) || text === "") {
      this.setState((state) => ({ ...state, code: text }));
    }
  }
  onVerifyPress() {
    if (this.state.code === "") {
      this.setState((state) => ({
        ...state,
        message: Strings.EMPTY_FIELD_ERROR,
      }));
    } else {
      this.props.dispatch(
        verifyPhoneNumber(this.props.route.params.phoneNumber, this.state.code)
      );
    }
  }
  render() {
    const { message, code } = this.state;
    const { containerStyle, cardContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        <Card containerStyle={cardContainerStyle}>
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
      </View>
    );
  }
}

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

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(Verification);
