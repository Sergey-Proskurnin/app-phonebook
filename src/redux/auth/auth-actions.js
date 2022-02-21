import { createAction } from '@reduxjs/toolkit';

const registerRequest = createAction('auth/registerRequest');
const registerSuccess = createAction('auth/registerSuccess');
const registerError = createAction('auth/registerError');

const loginRequest = createAction('auth/loginRequest');
const loginSuccess = createAction('auth/loginSuccess');
const loginError = createAction('auth/loginError');

const logoutRequest = createAction('auth/logoutRequest');
const logoutSuccess = createAction('auth/logoutSuccess');
const logoutError = createAction('auth/logoutError');

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction('auth/getCurrentUserError');

const editUserInfoRequest = createAction('auth/editUserInfoRequest');
const editUserInfoSuccess = createAction('auth/editUserInfoSuccess');
const editUserInfoError = createAction('auth/editUserInfoError');

const repeatEmailVerifyRequest = createAction('auth/repeatEmailVerifyRequest');
const repeatEmailVerifySuccess = createAction('auth/repeatEmailVerifySuccess');
const repeatEmailVerifyOk = createAction('auth/repeatEmailVerifyOk');
const repeatEmailVerifyError = createAction('auth/repeatEmailVerifyError');

const loginGoogleFacebookRequest = createAction(
  'auth/loginGoogleFacebookRequest',
);
const loginGoogleFacebookSuccess = createAction(
  'auth/loginGoogleFacebookSuccess',
);
const loginGoogleFacebookError = createAction('auth/loginGoogleFacebookError');

const refreshLoginGoogleFacebookRequest = createAction(
  'auth/refreshLoginGoogleFacebookRequest',
);
const refreshLoginGoogleFacebookSuccess = createAction(
  'auth/refreshLoginGoogleFacebookSuccess',
);
const refreshLoginGoogleFacebookError = createAction(
  'auth/refreshLoginGoogleFacebookError',
);

const changeLocalizationRequest = createAction(
  'auth/changeLocalizationRequest',
);
const changeLocalizationSuccess = createAction(
  'auth/changeLocalizationSuccess',
);
const changeLocalizationError = createAction('auth/changeLocalizationError');

export {
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  loginGoogleFacebookRequest,
  loginGoogleFacebookSuccess,
  loginGoogleFacebookError,
  refreshLoginGoogleFacebookRequest,
  refreshLoginGoogleFacebookSuccess,
  refreshLoginGoogleFacebookError,
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
  changeLocalizationRequest,
  changeLocalizationSuccess,
  changeLocalizationError,
};
