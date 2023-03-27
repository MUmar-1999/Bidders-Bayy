import BidderApi from '../api/BidderApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

export const register = createAsyncThunk(
  'auth/register',
  async (
    {
      firstName,
      lastName,
      email,
      password,
      rePassword,
      phoneNo,
      gender,
      address,
      dob = '2000-10-10',
    },
    { rejectWithValue }
  ) => {
    console.log('inide redux');
    try {
      await BidderApi.post('/users/signup', {
        firstName,
        lastName,
        email,
        password,
        rePassword,
        phoneNo,
        gender: 'male',
        address,
        dob: '2000-10-10',
      });
    } catch (error) {
      console.error('Register', error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await BidderApi.post('/users/login', {
        email,
        password,
      });
      // store user's token in local storage
      await setItemAsync('user', JSON.stringify(data.user));
      await setItemAsync('token', JSON.stringify(data.token));
      return data;
    } catch (error) {
      console.error('Login', error);

      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAuthToken = createAsyncThunk('auth/getAuthToken', async () => {
  try {
    const token = JSON.parse(await getItemAsync('token'));
    const user = JSON.parse(await getItemAsync('user'));
    return { token: token, user: user };
  } catch (error) {
    console.error('ERRTOKEN', error);
    return rejectWithValue(error);
  }
});