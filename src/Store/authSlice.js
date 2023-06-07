import { createSlice } from '@reduxjs/toolkit';
import { register, login, getAuthToken, update, forgetPassword, verifyOTP } from './authActions';
import { deleteItemAsync } from 'expo-secure-store';

const initialState = {
  loading: false,
  userInfo: null,
  userToken: undefined,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      deleteItemAsync('user');
      deleteItemAsync('token');
      state.userToken = null;
      state.userInfo = null;
    },
    tryLocalSignIn: (state, action) => {
      state.userToken = action.payload;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAuthToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.token;
        state.userInfo = payload.user;
      })
      .addCase(getAuthToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
      })
      .addCase(update.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }).addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const logout = authSlice.actions.logout;
export const tryLocalSignIn = authSlice.actions.tryLocalSignIn;
export const resetSuccess = authSlice.actions.resetSuccess;

export default authSlice.reducer;
