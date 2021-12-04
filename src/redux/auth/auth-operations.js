import alert from 'helpers/alert';

import {
  registerRequest,
  // registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
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
  fetchRefreshToken,
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
    token.unset();
    dispatch(logoutSuccess());
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
  } catch ({ response }) {
    if (response.data.message === 'Unvalid token') {
      return await refresh(dispatch, getState);
    }
    dispatch(getCurrentUserError(response.data.message));
    alert(`Server error: ${response.data.message}`);
  }
};

const editUserInfo = formData => async (dispatch, getState) => {
  dispatch(editUserInfoRequest());
  try {
    const response = await fetchEditUserInfo(formData);
    dispatch(editUserInfoSuccess(response.data.data));
  } catch ({ response }) {
    if (response.data.message === 'Unvalid token') {
      await refresh(dispatch, getState);
      const response = await fetchEditUserInfo(formData);
      return dispatch(editUserInfoSuccess(response.data.data));
    }
    dispatch(editUserInfoError(response.data.message));
    alert(`Server error: ${response.data.message}`);
  }
};

const refresh = async (dispatch, getState) => {
  const {
    auth: { refreshToken: persistedRefreshToken },
  } = getState();
  token.set(persistedRefreshToken);
  try {
    const response = await fetchRefreshToken();
    token.set(response.data.data.token);
    dispatch(getCurrentUserSuccess(response.data.data.user));
    dispatch(
      loginSuccess({
        token: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
      }),
    );
  } catch (error) {
    dispatch(logoutSuccess());
    dispatch(getCurrentUserError());
    token.unset();
    console.log(error.message);
  }
};

export { register, logOut, logIn, getCurrentUser, editUserInfo, refresh };
