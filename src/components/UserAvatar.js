import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

export default ({ avatarBase64, onEditPress }) => {
  const { avatarMargin } = styles;
  return (
    <View style={avatarMargin}>
      <Avatar
        source={{ uri: `data:image/gif;base64,${avatarBase64}` }}
        showEditButton
        rounded
        size="xlarge"
        onEditPress={onEditPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarMargin: {
    margin: 20,
  },
});
