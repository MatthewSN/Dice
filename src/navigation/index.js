import Screens from "../screens";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Game: Screens.Game,
  Home: Screens.Home,

  Login: Screens.Login,
  Verification: Screens.Verification,
  SignUp: Screens.SignUp,
});

export default createAppContainer(StackNavigator);
