import Screens from "../screens";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setName } from "../redux/actions";
import { getUser } from "../redux/actions/api";
import AsyncStorage from "@react-native-community/async-storage";
const Stack = createStackNavigator();
import Strings from "../utils/strings";
import Colors from "../utils/colors";

const Navigation = () => {
  const { token, name } = useSelector((state) => state.user);
  const [didFetchToken, setDidFetchToken] = useState(false);
  const [didFetchName, setDidFetchName] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  const getTokenFromStorage = async () => {
    try {
      const name = await AsyncStorage.getItem("name", (err) => {
        if (!err) {
          setDidFetchName(true);
        }
      });
      const token = await AsyncStorage.getItem("token", (err) => {
        if (!err) {
          setDidFetchToken(true);
        }
      });

      dispatch(setName(name));
      dispatch(setToken(token));
      if (!name) {
        dispatch(getUser(token));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  if (token && name) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Screens.Home} />
          <Stack.Screen name="Scores" component={Screens.Scores} />
          <Stack.Screen name="RetryAndScores" component={Screens.Scores} />
          <Stack.Screen name="Game" component={Screens.Game} />
          <Stack.Screen name="Profile" component={Screens.Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (!token && !name && didFetchToken && didFetchName) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignInOrUp" component={Screens.SignInOrUp} />
          <Stack.Screen name="Verification" component={Screens.Verification} />
          <Stack.Screen
            name="CompleteRegisteration"
            component={Screens.Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Loading" component={Screens.Loading} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Navigation;
