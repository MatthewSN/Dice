import Screens from "../screens";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "react-navigation-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { AsyncStorage } from "react-native";
import { setToken } from "../redux/actions";

const Stack = createStackNavigator();

const Navigation = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      dispatch(setToken(token));
    } catch (e) {
      console.log("Failed to get the data from storage!");
    }
  };
  if (token) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Screens.Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Game"
            component={Screens.Game}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Screens.Login} />
          <Stack.Screen name="SignUp" component={Screens.SignUp} />
          <Stack.Screen name="Verification" component={Screens.Verification} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default Navigation;

/* 
const LoginStackNavigator = createStackNavigator();

const LoginStackNavigatorContainer = () => {
  return (
    <LoginStackNavigator.Navigator>
      <LoginStackNavigator.Screen
        name="Notifications"
        component={Screens.Home}
      />
    </LoginStackNavigator.Navigator>
  );
};
 */
/* createStackNavigator({
  Login: Screens.Login,
  SignUp: Screens.SignUp,
}); */

/* LoginStackNavigator.navigationOptions = {
  headerShown: false,
};

const StackNavigator = createStackNavigator({
  LoginStackNavigator: {
    screen: LoginStackNavigatorContainer,
  },
  Home: Screens.Home,
  Game: Screens.Game,
  Verification: Screens.Verification,
});
 */
