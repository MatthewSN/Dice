import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Home: Screens.Home,
  Login: Screens.Login,
  Verification: Screens.Verification,
  SignUp: Screens.SignUp,
  Game: Screens.Game
});

export default createAppContainer(StackNavigator);
