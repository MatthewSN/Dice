import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Strings from "../utils/strings";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/actions/api";
import Colors from "../utils/colors";
import RegisterCard from "../components/RegisterCard";
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements";

const SignUp = ({ navigation }) => {
  const { containerStyle } = styles;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const dispatch = useDispatch();
  const { codeSent } = useSelector((state) => state.appStatus);

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
  const uploadPhotofrom = () => {};
  const setAvatarComponentImage = (base64) => {
    setAvatarBase64(base64);
  };
  const openGallery = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      setAvatarComponentImage(response.data);
    });
  };
  const UserAvatar = () => {
    return (
      <View>
        <Avatar
          source={{ uri: `data:image/gif;base64,${avatarBase64}` }}
          showEditButton
          rounded
          size="large"
          onEditPress={openGallery}
        />
      </View>
    );
  };
  return (
    <View style={containerStyle}>
      {UserAvatar}
      <RegisterCard
        placeholder={Strings.NAME}
        rightIcon={{ type: "font-awesome", name: "user" }}
        value={name}
        onChangeText={nameChangeHandler}
        cardTitle={Strings.COMPLETE_RIGISTRATION}
        errorMessage={message}
        onButtonPress={onSignUpPress}
        buttonTitle={Strings.REGISTER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.COLOR_RED_2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default SignUp;
