import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginSuccess,
  loginError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  editUserInfoSuccess,
  editUserInfoError,
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
  [loginError]: setError,
  [logoutError]: setError,
  [getCurrentUserError]: setError,
  [editUserInfoError]: setError,
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

const authReducer = combineReducers({
  user,
  isLogin,
  token,
  refreshToken,
  error,
  isFetchigCurrentUser,
  logout,
});
export { authReducer };
