import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './src/Store/store.js';
import { getAuthToken } from './src/Store/authActions';

import NavContainer from './src/Screens/NavContainer';

export default function App() {
  useEffect(() => {
    store.dispatch(getAuthToken());
  }, []);

  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
}
