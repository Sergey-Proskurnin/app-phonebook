import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  editUserInfoRequest,
  editUserInfoSuccess,
  editUserInfoError,
  repeatEmailVerifyRequest,
  repeatEmailVerifySuccess,
  repeatEmailVerifyOk,
  repeatEmailVerifyError,
} from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [editUserInfoSuccess]: (_, { payload }) => payload.user,
});

const token = createReducer(null, {
  // [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});
const refreshToken = createReducer(null, {
  // [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.refreshToken,
  [logoutSuccess]: () => null,
});
const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [registerError]: setError,
  [registerSuccess]: () => null,
  [registerRequest]: () => null,
  [loginError]: setError,
  [loginSuccess]: () => null,
  [loginRequest]: () => null,
  [logoutError]: setError,
  [logoutSuccess]: () => null,
  [logoutRequest]: () => null,
  [getCurrentUserError]: setError,
  [getCurrentUserSuccess]: () => null,
  [getCurrentUserRequest]: () => null,
  [editUserInfoError]: setError,
  [editUserInfoSuccess]: () => null,
  [editUserInfoRequest]: () => null,
  [repeatEmailVerifyError]: setError,
  [repeatEmailVerifySuccess]: () => null,
  [repeatEmailVerifyRequest]: () => null,
});
const isLogin = createReducer(false, {
  [registerSuccess]: () => false,
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [registerError]: () => false,
  [loginError]: () => false,
  [getCurrentUserError]: () => false,
  [logoutSuccess]: () => false,
});

const isFetchigCurrentUser = createReducer(false, {
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
});

const logout = createReducer(false, {
  [logoutRequest]: () => true,
  [logoutSuccess]: () => true,
  [logoutError]: () => false,
});

const isRepeatEmailVerify = createReducer(null, {
  [repeatEmailVerifySuccess]: (_, { payload }) => payload.data.message,
  [repeatEmailVerifyOk]: () => null,
});

const authReducer = combineReducers({
  user,
  isLogin,
  token,
  refreshToken,
  error,
  isFetchigCurrentUser,
  logout,
  isRepeatEmailVerify,
});
export { authReducer };
