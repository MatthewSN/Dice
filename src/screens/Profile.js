import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Strings from "../utils/strings";
import { useDispatch, useSelector } from "react-redux";
import { userEdit } from "../redux/actions/api";
import Colors from "../utils/colors";
import RegisterCard from "../components/RegisterCard";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import UserAvatar from "../components/UserAvatar";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const SignUp = ({ navigation }) => {
  const {
    containerStyle,
    childContainerStyle,
    flex_1,
    flex_2,
    buttonContainerStyle,
  } = styles;
  const { name: userName } = useSelector((state) => state.user);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState(userName);
  const [avatarBase64, setAvatarBase64] = useState("");
  const dispatch = useDispatch();

  //Called when text input change
  const nameChangeHandler = (text) => {
    setName(text);
  };

  //Called when pressing button for subminting image and name
  const onCompleteButtonPress = () => {
    if (!name) {
      setMessage(Strings.EMPTY_FIELDS_ERROR);
    } else {
      dispatch(userEdit(avatarBase64, name));
    }
  };

  //Uses react-native-fs to access photo in phone storage and then convert it to base64
  const getImageBase64 = async (resizedImageUrl) => {
    try {
      const base64 = await RNFS.readFile(resizedImageUrl, "base64");

      setAvatarBase64(base64);
    } catch (e) {}
  };
  //Sets height and width and resolution of  an image to a low value
  const tryReduceImageproperties = async (imageUri) => {
    try {
      const response = await ImageResizer.createResizedImage(
        imageUri,
        400,
        400,
        "PNG",
        50,
        0,
        RNFS.DocumentDirectoryPath
      );

      getImageBase64(response.path);
    } catch (e) {
      console.log(e.message);
    }
  };

  const tryOpenGallery = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      tryReduceImageproperties(response.path);
      setAvatarBase64(response.data);
    });
  };

  //Renders user avatar
  const RenderAvatar = () => {
    return (
      <View style={{ ...childContainerStyle, ...flex_1 }}>
        <UserAvatar avatarBase64={avatarBase64} onEditPress={tryOpenGallery} />
      </View>
    );
  };
  //Renders a Card component with a tilte and TextInput and a Button in it
  const CustomizedRegiterCard = () => {
    return (
      <View style={{ ...childContainerStyle, ...flex_2 }}>
        <Text>{userName}</Text>
        <View style={{ width: "100%" }}>
          <Input value={name} onChangeText={nameChangeHandler} />
        </View>
        {/*    <RegisterCard
          placeholder={Strings.NAME}
          rightIcon={{ type: "font-awesome", name: "user" }}
          value={name}
          onChangeText={nameChangeHandler}
          errorMessage={message}
          onButtonPress={onCompleteButtonPress}
          buttonTitle={Strings.COMPLETE}
        ></RegisterCard> */}
      </View>
    );
  };

  const SubmitButton = () => {
    return (
      <View style={buttonContainerStyle}>
        <Button title={Strings.SAVE} />
      </View>
    );
  };
  return (
    <View style={containerStyle}>
      {RenderAvatar()}
      {CustomizedRegiterCard()}
      {SubmitButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.COLOR_RED_2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  childContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  flex_1: {
    height: DEVICE_HEIGHT / 3,
  },
  flex_2: {
    height: DEVICE_HEIGHT / 5,
  },
  buttonContainerStyle: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default SignUp;
