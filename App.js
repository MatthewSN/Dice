import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {} from "react-native-elements";
import RNTapsellPlus from "react-native-tapsell-plus";
import Navigator from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Keys from "./src/utils/tapsellKeys";

export default function App() {
  useEffect(() => {
    RNTapsellPlus.initialize(Keys.TAPSELL_KEY);
  }, []);
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
