import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Home: Screens.Home,
  Game: Screens.Game,
  SignUp: Screens.SignUp,
  Login: Screens.Login,
  Verification: Screens.Verification
});

export default createAppContainer(StackNavigator);
