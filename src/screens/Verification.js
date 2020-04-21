import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Strings from "../utils/strings";
import validator from "validator";
import { connect } from "react-redux";
import { setCodeSent } from "../redux/actions";
import { verifyPhoneNumber } from "../redux/actions/api";
import Colors from "../utils/colors";
import RegisterCard from "../components/RegisterCard";


class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onVerifyPress = this.onVerifyPress.bind(this);
    this.setCodeSentState = this.setCodeSentState.bind(this);
    this.state = {
      message: null,
      code: "",
    };
  }

  //Reset codeSent back to false when the screen going to unmount
  componentWillUnmount() {
    this.setCodeSentState(false);
  }
  //Setting codeSent state
  setCodeSentState = (didSend) => {
    this.props.dispatch(setCodeSent(didSend));
  };

  //Called each time user enters something in the textField
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
        <RegisterCard
          keyboardType="numeric"
          value={code}
          onChangeText={this.onCodeChange}
          placeholder={Strings.CODE}
          maxLength={5}
          errorMessage={message}
          onButtonPress={this.onVerifyPress}
          buttonTitle={Strings.VERIFICATION}
        />
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

export default connect()(Verification);
