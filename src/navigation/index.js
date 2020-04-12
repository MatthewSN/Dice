import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Home: Screens.Home,
  Game: Screens.Game,
  Login: Screens.Login,
  Verification: Screens.Verification,
  SignUp: Screens.SignUp,
});

export default createAppContainer(StackNavigator);
