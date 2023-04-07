import createDataContext from './createDataContext';
import * as SecureStore from 'expo-secure-store';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signIn':
      return { token: action.payload, errorMessage: '' };
    case 'signout':
      return { ...state, token: action.payload };
    default: {
      return state;
    }
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await SecureStore.getItemAsync('Current_User');
  if (token != null) {
    dispatch({ type: 'signIn', payload: token });
  }
};
const signup = (dispatch) => {
  return async ({ name, email, password, cpassword }) => {
    try {
      const response = await wandererApi.post('/api/users/register', {
        name,
        email,
        password,
        cpassword,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with SignUp',
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await wandererApi.post('/api/users/login', {
        email,
        password,
      });
      await SecureStore.setItemAsync(
        'Current_User',
        JSON.stringify(response.data)
      );
      dispatch({
        type: 'signIn',
        payload: JSON.stringify(response.data),
      });
    } catch (error) {
      console.log(error);
    }
  };
};
const signout = (dispatch) => {
  return async () => {
    await SecureStore.deleteItemAsync('Current_User');
    dispatch({ type: 'signout', payload: null });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, tryLocalSignin, signout },
  { token: undefined, errorMessage: '' }
);
