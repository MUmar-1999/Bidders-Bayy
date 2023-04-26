import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import Register from "./Register";
import Home from "../MainFlow/Home";

const StartScreens = createStackNavigator();

export default StartScreenStack = () => {
  return (
    <StartScreens.Navigator screenOptions={{ headerShown: false }}>
      <StartScreens.Screen name="Login" component={Login} />
      <StartScreens.Screen name="Signup" component={Register} />
      <StartScreens.Screen name="Home" component={Home} />
    </StartScreens.Navigator>
  );
};
