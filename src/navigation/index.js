import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Verification: Screens.Verification,
  Login: Screens.Login,
  SignUp: Screens.SignUp,
  Home: Screens.Home,
  Game: Screens.Game
});

export default createAppContainer(StackNavigator);
