import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Home: Screens.Home,
  SignUp: Screens.SignUp,
  Login: Screens.Login,

  Game: Screens.Game,
  Verification: Screens.Verification
});

export default createAppContainer(StackNavigator);
