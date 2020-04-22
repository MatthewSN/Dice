import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Strings from "../utils/strings";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/actions/api";
import Colors from "../utils/colors";
import RegisterCard from "../components/RegisterCard";
import ImagePicker from "react-native-image-picker";
import { Avatar } from "react-native-elements";

const DEVICE_HEIGHT = Dimensions.get("window").height;

const SignUp = ({ navigation }) => {
  const {
    containerStyle,
    childContainerStyle,
    flex_1,
    flex_2,
    avatarMargin,
  } = styles;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [avatarBase64, setAvatarBase64] = useState("");
  const dispatch = useDispatch();
  const { codeSent } = useSelector((state) => state.appStatus);

  const nameChangeHandler = (text) => {
    setName(text);
  };
  const onCompleteButtonPress = () => {
    if (!name) {
      setMessage(Strings.EMPTY_FIELDS_ERROR);
    } else {
      
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

  //Renders a placeholder for user avatar
  const UserAvatar = () => {
    return (
      <View style={{ ...childContainerStyle, ...flex_1 }}>
        <View style={avatarMargin}>
          <Avatar
            source={{ uri: `data:image/gif;base64,${avatarBase64}` }}
            showEditButton
            rounded
            size="xlarge"
            onEditPress={openGallery}
            avatarStyle={{ backgroundColor: Colors.COLOR_GRAY_1 }}
          />
        </View>
      </View>
    );
  };
  //Renders a Card component with a tilte and TextInput and a Button in it
  const CustomizedRegiterCard = () => {
    return (
      <View style={{ ...childContainerStyle, ...flex_2 }}>
        <RegisterCard
          placeholder={Strings.NAME}
          rightIcon={{ type: "font-awesome", name: "user" }}
          value={name}
          onChangeText={nameChangeHandler}
          errorMessage={message}
          onButtonPress={onCompleteButtonPress}
          buttonTitle={Strings.COMPLETE}
        />
      </View>
    );
  };
  return (
    <View style={containerStyle}>
      {UserAvatar()}
      {CustomizedRegiterCard()}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.COLOR_RED_2,
    width: "100%",
    height: "100%",
  },
  childContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  flex_1: {
    height: DEVICE_HEIGHT / 3,
  },
  flex_2: {
    height: DEVICE_HEIGHT / 3,
  },
  avatarMargin: {
    margin: 20,
  },
});

export default SignUp;
