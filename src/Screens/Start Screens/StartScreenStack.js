import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Register from './Register';

const StartScreens = createStackNavigator();

export const StartScreenStack = () => {
  return (
    <StartScreens.Navigator screenOptions={{ headerShown: false }}>
      <StartScreens.Screen name="Login" component={Login} />
      <StartScreens.Screen name="Signup" component={Register} />
    </StartScreens.Navigator>
  );
};
