import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Login: Screens.Login,
  Home: Screens.Home,
  Game: Screens.Game,
  Verification: Screens.Verification,
  SignUp: Screens.SignUp
});

export default createAppContainer(StackNavigator);
