import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StartScreenStack } from './Screens/Start Screens/StartScreenStack';

// import { Context as AuthContext } from './Context/AuthContext';

export const NavContainer = () => {
  // const { state, tryLocalSignin } = useContext(AuthContext);

  // useEffect(() => {
  //   tryLocalSignin();
  // }, []);
  return (
    <NavigationContainer>
      <StartScreenStack />
    </NavigationContainer>
  );
};
