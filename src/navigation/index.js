import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Login: Screens.Login,
  Game: Screens.Game,
  Home: Screens.Home,

  Verification: Screens.Verification,
  SignUp: Screens.SignUp
});

export default createAppContainer(StackNavigator);
