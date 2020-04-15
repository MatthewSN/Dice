import Screens from "../screens";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "react-navigation-stack";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

const AppStackContainer = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Screens.Home}
      />
      <AppStack.Screen
        options={{ headerShown: false }}
        name="Game"
        component={Screens.Game}
      />
    </AppStack.Navigator>
  );
};

const AuthStackContainer = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Screens.Login} />
      <AuthStack.Screen name="SignUp" component={Screens.SignUp} />
      <AuthStack.Screen name="Verify" component={Screens.Verification} />
    </AuthStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="App"
          component={AppStackContainer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Auth"
          component={AuthStackContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
