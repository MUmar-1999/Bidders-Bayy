import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import StartScreenStack from './Start Screens/StartScreenStack';
import MainFlowStack from './MainFlow/MainFlowStack';

export default NavContainer = () => {
  const { userToken } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {userToken ? <MainFlowStack /> : <StartScreenStack />}
    </NavigationContainer>
  );
};
