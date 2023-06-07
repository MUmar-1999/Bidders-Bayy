import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import Register from "./Register";
import Home from "../MainFlow/Home";
import ForgetPass from "./ForgetPasswordFlow/ForgetPass";
import OTPScreen from "./ForgetPasswordFlow/OTPScreen";

const StartScreens = createStackNavigator();

export default StartScreenStack = () => {
  return (
    <StartScreens.Navigator screenOptions={{ headerShown: false }}>
      <StartScreens.Screen name="Login" component={Login} />
      <StartScreens.Screen name="Signup" component={Register} />
      <StartScreens.Screen name="Home" component={Home} />
      <StartScreens.Screen name="ForgetPass" component={ForgetPass} />
      <StartScreens.Screen name="OTPscreen" component={OTPScreen} />
    </StartScreens.Navigator>
  );
};
