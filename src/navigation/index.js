import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Login: Screens.Login,
  SignUp: Screens.SignUp,
  Home: Screens.Home,
  Game: Screens.Game,
  Verification: Screens.Verification
});

export default createAppContainer(StackNavigator);
