import alert from 'helpers/alert';

import {
  registerRequest,
  // registerSuccess,
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
} from './auth-actions';

import {
  token,
  fetchSignUp,
  fetchLogin,
  fetchLogout,
  fetchCurrent,
  fetchEditUserInfo,
} from 'services/fetchApi';

const register = credentials => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await fetchSignUp(credentials);
    // token.set(response.data.token);
    console.log(response);
    // dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerError(error.message));
    alert(`Incorrect login!
    Server error: ${error.message}`);
  }
};

const logIn = credentials => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await fetchLogin(credentials);
    token.set(response.data.data);
    dispatch(loginSuccess(response.data.data));
  } catch (error) {
    dispatch(loginError(error.message));
    alert(`Incorrect login or password! Server error: ${error.message}`);
  }
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());
  try {
    await fetchLogout();
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
    alert(`Server error: ${error.message}`);
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);
  dispatch(getCurrentUserRequest());
  try {
    const response = await fetchCurrent();
    dispatch(getCurrentUserSuccess(response.data.user));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
    alert(`Server error: ${error.message}`);
  }
};

const editUserInfo = formData => async dispatch => {
  dispatch(editUserInfoRequest());
  try {
    const response = await fetchEditUserInfo(formData);
    dispatch(editUserInfoSuccess(response.data.data));
  } catch ({ response }) {
    dispatch(editUserInfoError(response.data.message));
    alert(response.data.message);
  }
};

export { register, logOut, logIn, getCurrentUser, editUserInfo };
