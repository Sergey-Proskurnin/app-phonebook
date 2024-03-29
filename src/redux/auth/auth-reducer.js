import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  changeContactRequest,
  changeContactSuccess,
  changeContactError,
  changeFavoriteContactRequest,
  changeFavoriteContactSuccess,
  changeFavoriteContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  fetchContacts,
} from 'redux/contacts';

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
  loginGoogleFacebookRequest,
  loginGoogleFacebookSuccess,
  loginGoogleFacebookError,
  refreshLoginGoogleFacebookRequest,
  refreshLoginGoogleFacebookSuccess,
  refreshLoginGoogleFacebookError,
  changeLocalizationRequest,
  changeLocalizationSuccess,
  changeLocalizationError,
  changeUserSubscriptionRequest,
  changeUserSubscriptionSuccess,
  changeUserSubscriptionError,
} from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [editUserInfoSuccess]: (_, { payload }) => payload.user,
  [changeUserSubscriptionSuccess]: (state, { payload }) => ({
    ...state,
    subscription: payload,
  }),
});

const token = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.token,
  [loginGoogleFacebookSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: () => null,
});
const refreshToken = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.refreshToken,
  [refreshLoginGoogleFacebookSuccess]: (_, { payload }) => payload,
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
  [fetchContacts.rejected]: setError,
  [fetchContacts.pending]: () => null,
  [fetchContacts.fulfilled]: () => null,
  [addContactError]: setError,
  [addContactSuccess]: () => null,
  [addContactRequest]: () => null,
  [deleteContactError]: setError,
  [deleteContactSuccess]: () => null,
  [deleteContactRequest]: () => null,
  [changeContactError]: setError,
  [changeContactSuccess]: () => null,
  [changeContactRequest]: () => null,
  [changeFavoriteContactError]: setError,
  [changeFavoriteContactSuccess]: () => null,
  [changeFavoriteContactRequest]: () => null,
  [loginGoogleFacebookError]: setError,
  [loginGoogleFacebookSuccess]: () => null,
  [loginGoogleFacebookRequest]: () => null,
  [refreshLoginGoogleFacebookError]: setError,
  [refreshLoginGoogleFacebookSuccess]: () => null,
  [refreshLoginGoogleFacebookRequest]: () => null,
  [changeLocalizationError]: setError,
  [changeLocalizationSuccess]: () => null,
  [changeLocalizationRequest]: () => null,
  [changeUserSubscriptionError]: setError,
  [changeUserSubscriptionSuccess]: () => null,
  [changeUserSubscriptionRequest]: () => null,
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

const logout = createReducer(true, {
  [logoutRequest]: () => false,
  [logoutSuccess]: () => false,
  [logoutError]: () => true,
  [loginRequest]: () => true,
  [loginSuccess]: () => true,
  [loginError]: () => true,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => true,
  [getCurrentUserError]: () => true,
});

const isRepeatEmailVerify = createReducer(null, {
  [repeatEmailVerifySuccess]: (_, { payload }) => payload.data.message,
  [repeatEmailVerifyOk]: () => null,
});

const localization = createReducer('en', {
  [changeLocalizationSuccess]: (_, { payload }) => payload,
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
  localization,
});
export { authReducer };
